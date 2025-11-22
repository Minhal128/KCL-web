import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../../../services/api';
import toast from 'react-hot-toast';

// Default category images (fallbacks)
const categoryImages = {
  'action': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400',
  'comedy': 'https://images.unsplash.com/photo-1527224538127-2104bb04c4fb?w=400',
  'adventure': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  'romance': 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400',
  'musical': 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=400',
  'crime': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
  'drama': 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400',
  'horror': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400',
  'thriller': 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=400',
  'fiction': 'https://images.unsplash.com/photo-1495841020177-1919ede29bd8?w=400',
  'mystery': 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400',
  'fantasy': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
  'animation': 'https://images.unsplash.com/photo-1626762872767-d97ad23666aa?w=400',
  'documentary': 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400',
  'biography': 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400',
  'war': 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=400',
  'sci-fi': 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400',
  'family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400',
};

const CategoriesPage = () => {
  const [genres, setGenres] = useState([]);
  const [genreContent, setGenreContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      setLoading(true);
      const response = await contentAPI.getAllGenres();
      const genresData = response.data?.data || [];
      setGenres(genresData);

      // Fetch sample content for each genre to get thumbnails
      const contentPromises = genresData.slice(0, 16).map(async (genre) => {
        try {
          const content = await contentAPI.getContentByGenre(genre, 1);
          return { genre, content: content.data?.data?.[0] };
        } catch (error) {
          return { genre, content: null };
        }
      });

      const results = await Promise.all(contentPromises);
      const contentMap = {};
      results.forEach(({ genre, content }) => {
        contentMap[genre] = content;
      });
      setGenreContent(contentMap);
    } catch (error) {
      console.error('Error fetching genres:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const getGenreImage = (genre) => {
    const content = genreContent[genre];
    if (content && (content.thumbnail || content.poster)) {
      return content.thumbnail || content.poster;
    }
    return categoryImages[genre.toLowerCase()] || 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400';
  };

  if (loading) {
    return (
      <div className='text-white'>
        <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-4'>
          <p>Categories</p>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18B451]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='text-white'>
      <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-4'>
        <p>Categories</p>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {genres.map((genre, index) => (
          <Link
            key={index}
            to={`/dashboard/genre/${encodeURIComponent(genre)}`}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-32"
          >
            <img
              src={getGenreImage(genre)}
              alt={genre}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center rounded-lg">
              <p className="text-xl font-bold capitalize">{genre}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {genres.length === 0 && (
        <div className="text-center py-10 text-gray-400">
          No categories available yet
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
