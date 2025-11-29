import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { contentAPI, watchlistAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import watchlist_1 from '../../../assets/dashboard/watchlist/watchlist_1.png';

const GenrePage = () => {
    const { genre } = useParams();
    const [content, setContent] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (genre) {
            fetchGenreContent();
        }
    }, [genre]);

    const fetchGenreContent = async () => {
        try {
            setLoading(true);
            const [contentRes, watchlistRes] = await Promise.all([
                contentAPI.getContentByGenre(decodeURIComponent(genre), 50),
                watchlistAPI.getWatchlist().catch(() => ({ data: { wishlist: [] } }))
            ]);
            
            setContent(contentRes.data?.data || []);
            setWatchlist(watchlistRes.data?.wishlist || []);
        } catch (error) {
            console.error('Error fetching genre content:', error);
            toast.error('Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async (contentId) => {
        try {
            await watchlistAPI.addToWatchlist(contentId);
            toast.success('Added to watchlist!');
            fetchGenreContent();
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            toast.error(error.response?.data?.message || 'Failed to add to watchlist');
        }
    };

    const isInWatchlist = (contentId) => {
        return watchlist.some(item => item._id === contentId || item.contentId === contentId);
    };

    if (loading) {
        return (
            <div className='text-white'>
                <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-2'>
                    <Link to='/dashboard/categories' className='text-[#AECFFF] hover:text-white'>Categories</Link>
                    <IoIosArrowForward />
                    <p className='capitalize'>{decodeURIComponent(genre)}</p>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18B451]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className='text-white'>
            <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-2'>
                <Link to='/dashboard/categories' className='text-[#AECFFF] hover:text-white'>Categories</Link>
                <IoIosArrowForward />
                <p className='capitalize'>{decodeURIComponent(genre)}</p>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4 capitalize">{decodeURIComponent(genre)} Movies & Series</h2>
                
                {content.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {content.map((item, index) => (
                            <div key={item._id || index} className="relative group">
                                <Link to={`/dashboard/categories/movie/${item._id}`}>
                                    <img 
                                        src={item.thumbnail || item.poster || watchlist_1} 
                                        alt={item.title}
                                        className='w-full h-[260px] object-cover rounded-lg'
                                        onError={(e) => e.target.src = watchlist_1}
                                    />
                                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center'>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddToWatchlist(item._id);
                                            }}
                                            className='opacity-0 group-hover:opacity-100 transition-opacity'
                                        >
                                            <FaHeart className={`text-2xl ${isInWatchlist(item._id) ? 'text-red-500' : 'text-white'}`} />
                                        </button>
                                    </div>
                                </Link>
                                <p className='mt-2 text-sm font-medium truncate'>{item.title}</p>
                                <p className='text-xs text-gray-400'>{item.releaseYear || item.year}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-xl">No content available in this category yet</p>
                        <Link to='/dashboard/categories' className='text-[#18B451] hover:underline mt-4 inline-block'>
                            Browse other categories
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenrePage;
