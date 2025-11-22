import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import cat_1 from '../../../assets/dashboard/categories/cat1.png';
import cat_2 from '../../../assets/dashboard/categories/cat2.png';
import cat_3 from '../../../assets/dashboard/categories/cat3.png';
import cat_4 from '../../../assets/dashboard/categories/cat4.png';
import cat_5 from '../../../assets/dashboard/categories/cat5.png';
import cat_6 from '../../../assets/dashboard/categories/cat6.png';
import cat_7 from '../../../assets/dashboard/categories/cat7.png';
import cat_8 from '../../../assets/dashboard/categories/cat8.png';
import cat_9 from '../../../assets/dashboard/categories/cat9.png';
import cat_10 from '../../../assets/dashboard/categories/cat10.png';
import cat_11 from '../../../assets/dashboard/categories/cat11.png';
import cat_12 from '../../../assets/dashboard/categories/cat12.png';
import cat_13 from '../../../assets/dashboard/categories/cat13.png';
import cat_14 from '../../../assets/dashboard/categories/cat14.png';
import cat_15 from '../../../assets/dashboard/categories/cat15.png';
import cat_16 from '../../../assets/dashboard/categories/cat16.png';

const fallbackImages = [cat_1, cat_2, cat_3, cat_4, cat_5, cat_6, cat_7, cat_8, cat_9, cat_10, cat_11, cat_12, cat_13, cat_14, cat_15, cat_16];

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

            // Fetch sample content for each genre
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

    const getGenreImage = (genre, index) => {
        const content = genreContent[genre];
        if (content && (content.thumbnail || content.poster)) {
            return content.thumbnail || content.poster;
        }
        return fallbackImages[index % fallbackImages.length];
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
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer h-32">
                        <Link to={`/dashboard/genre/${encodeURIComponent(genre)}`}>
                            <img
                                src={getGenreImage(genre, index)}
                                alt={genre}
                                className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
                                onError={(e) => e.target.src = fallbackImages[index % fallbackImages.length]}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-center justify-center rounded-lg">
                                <p className="text-xl font-bold capitalize">{genre}</p>
                            </div>
                        </Link>
                    </div>
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
