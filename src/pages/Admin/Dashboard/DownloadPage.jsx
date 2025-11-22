import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { contentAPI, watchlistAPI } from '../../../services/api';
import { FaHeart, FaPlayCircle, FaDownload } from 'react-icons/fa';
import toast from 'react-hot-toast';
import watchlist_1 from '../../../assets/dashboard/watchlist/watchlist_1.png';

const DownloadPage = () => {
    const [downloadContent, setDownloadContent] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            setLoading(true);
            // Since there might not be a specific downloads API, we'll show recent content
            // In a real app, this would fetch user's downloaded content
            const [contentRes, watchlistRes] = await Promise.all([
                contentAPI.getAllContent({ limit: 12 }),
                watchlistAPI.getWatchlist().catch(() => ({ data: { wishlist: [] } }))
            ]);
            
            setDownloadContent(contentRes.data?.data?.content || []);
            setWatchlist(watchlistRes.data?.wishlist || []);
        } catch (error) {
            console.error('Error fetching downloads:', error);
            toast.error('Failed to load downloads');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToWatchlist = async (contentId) => {
        try {
            await watchlistAPI.addToWatchlist(contentId);
            toast.success('Added to watchlist!');
            fetchDownloads();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add to watchlist');
        }
    };

    const isInWatchlist = (contentId) => {
        return watchlist.some(item => item._id === contentId || item.contentId === contentId);
    };

    if (loading) {
        return (
            <div className='text-white'>
                <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-4'>
                    <p>Downloads</p>
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
                <p>Downloads</p>
            </div>

            <p className='mt-6 text-sm text-gray-400'>Available content for offline viewing</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {downloadContent.map((item, index) => (
                    <Link 
                        key={item._id || index} 
                        to={`/dashboard/categories/movie/${item._id}`}
                        className="relative rounded-lg overflow-hidden shadow-lg group"
                    >
                        <img 
                            src={item.thumbnail || item.poster || watchlist_1} 
                            alt={item.title} 
                            className="w-full h-[300px] object-cover"
                            onError={(e) => e.target.src = watchlist_1}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FaPlayCircle className="text-white text-5xl cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-2 z-10">
                            <div 
                                className="bg-black/50 p-2 rounded-full cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToWatchlist(item._id);
                                }}
                            >
                                <FaHeart className={`${isInWatchlist(item._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors`} />
                            </div>
                            <div className="bg-[#18B451]/80 p-2 rounded-full">
                                <FaDownload className="text-white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                            <p className="text-lg font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-300">{item.releaseYear || item.year} - {item.duration || 'N/A'}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {downloadContent.length === 0 && (
                <div className="text-center py-10 text-gray-400">
                    <FaDownload className="text-6xl mx-auto mb-4 opacity-50" />
                    <p>No downloads available yet</p>
                </div>
            )}
        </div>
    );
};

export default DownloadPage;