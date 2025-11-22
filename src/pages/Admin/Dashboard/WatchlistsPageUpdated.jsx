import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { watchlistAPI } from '../../../services/api';
import { FaHeart, FaPlayCircle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import watchlist_1 from '../../../assets/dashboard/watchlist/watchlist_1.png';

const WatchlistsPage = () => {
    const [watchlistContent, setWatchlistContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            setLoading(true);
            const response = await watchlistAPI.getWatchlist();
            setWatchlistContent(response.data?.wishlist || []);
        } catch (error) {
            console.error('Error fetching watchlist:', error);
            toast.error('Failed to load watchlist');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromWatchlist = async (contentId) => {
        try {
            await watchlistAPI.removeFromWatchlist(contentId);
            toast.success('Removed from watchlist!');
            fetchWatchlist();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to remove from watchlist');
        }
    };

    if (loading) {
        return (
            <div className='text-white'>
                <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-4'>
                    <p>Watchlist</p>
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
                <p>Watchlist</p>
            </div>

            <p className='mt-6 text-xl'>Your queue of must <br />-watch moments....</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {watchlistContent.map((item, index) => {
                    const content = item.content || item;
                    return (
                        <Link 
                            key={content._id || index} 
                            to={`/dashboard/categories/movie/${content._id}`}
                            className="relative rounded-lg overflow-hidden shadow-lg group"
                        >
                            <img 
                                src={content.thumbnail || content.poster || watchlist_1} 
                                alt={content.title} 
                                className="w-full h-[300px] object-cover"
                                onError={(e) => e.target.src = watchlist_1}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <FaPlayCircle className="text-white text-5xl cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                            <div 
                                className="absolute top-2 right-2 text-white p-2 rounded-full z-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveFromWatchlist(content._id);
                                }}
                            >
                                <FaHeart className="text-red-500 hover:text-gray-400 transition-colors" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                                <p className="text-lg font-semibold">{content.title}</p>
                                <p className="text-sm text-gray-300">{content.releaseYear || content.year} - {content.duration || 'N/A'}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {watchlistContent.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    Your watchlist is empty. Start adding content!
                </div>
            )}
        </div>
    );
};

export default WatchlistsPage;
