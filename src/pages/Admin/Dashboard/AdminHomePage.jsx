import banner from "../../../assets/dashboard/banner.png";
import card_1 from "../../../assets/dashboard/card_1.png";
import card_3 from "../../../assets/dashboard/card_3.png";
import card_2 from "../../../assets/dashboard/card_2.png";
import s_card_1 from "../../../assets/dashboard/s_card_1.png";
import categories from "../../../assets/dashboard/categories.png";
import { FaHeart, FaEllipsisH } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { contentAPI, watchlistAPI } from "../../../services/api";
import { useUser } from "../../../context/UserContext";
import toast from "react-hot-toast";

const AdminHomePage = () => {
  const { user } = useUser();
  const [exclusiveTab, setExclusiveTab] = useState("local");
  const [featuredContent, setFeaturedContent] = useState([]);
  const [recentContent, setRecentContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);

      // Fetch all content types in parallel
      const [featuredRes, recentRes, trendingRes, genresRes, watchlistRes] =
        await Promise.all([
          contentAPI
            .getFeaturedContent(10)
            .catch((err) => ({ data: { data: [] } })),
          contentAPI
            .getAllContent({ page: 1, limit: 10 })
            .catch((err) => ({ data: { data: { content: [] } } })),
          contentAPI
            .getAllContent({ page: 1, limit: 10, isFeatured: true })
            .catch((err) => ({ data: { data: { content: [] } } })),
          contentAPI.getAllGenres().catch((err) => ({ data: { data: [] } })),
          watchlistAPI
            .getWatchlist()
            .catch((err) => ({ data: { wishlist: [] } })),
        ]);

      setFeaturedContent(featuredRes.data?.data || []);
      setRecentContent(recentRes.data?.data?.content || []);
      setTrendingContent(trendingRes.data?.data?.content || []);
      setGenres(genresRes.data?.data || []);
      setWatchlist(watchlistRes.data?.wishlist || []);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async (contentId) => {
    try {
      await watchlistAPI.addToWatchlist(contentId);
      toast.success("Added to watchlist!");
      fetchContent(); // Refresh to update watchlist
    } catch (error) {
      console.error("Error adding to watchlist:", error);
      toast.error(
        error.response?.data?.message || "Failed to add to watchlist"
      );
    }
  };

<<<<<<< HEAD
            <h1 className="text-[#AECFFF]">Welcome Back</h1>
            <p className='text-lg'>{user?.name || 'User'}</p>

            <div className="md:flex items-start gap-4">

                <div className="mt-4 flex-1">
                    <img src={banner} alt="" className='bg-cover w-full' />
                    <div className='mt-4'>
                        <div className='flex justify-between items-center'>
                            <p>Recently Played</p>
                            <Link to="/dashboard/explore"><p className='text-[#18B451] cursor-pointer'>See all</p></Link>
                        </div>
                        <div className='w-full overflow-x-auto flex gap-4 items-center'>
                            {recentContent.length > 0 ? (
                                recentContent.map((content, index) => (
                                    <Link 
                                        key={content._id || index} 
                                        to={`/dashboard/categories/movie/${content._id}`}
                                        className='min-w-[180px] flex-shrink-0'
                                    >
                                        <div className='relative group cursor-pointer'>
                                            <img 
                                                src={content.thumbnail || content.poster || card_1} 
                                                alt={content.title}
                                                className='w-full h-[260px] object-cover rounded-lg'
                                                onError={(e) => e.target.src = card_1}
                                            />
                                            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center'>
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToWatchlist(content._id);
                                                    }}
                                                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                                                >
                                                    <FaHeart className={`text-2xl ${isInWatchlist(content._id) ? 'text-red-500' : 'text-white'}`} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className='mt-2 text-sm font-medium truncate'>{content.title}</p>
                                        <p className='text-xs text-gray-400'>{content.releaseYear || content.year}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className='text-gray-400 text-sm'>No recent content available</p>
                            )}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between items-center'>
                            <p>Top Trending</p>
                            <Link to={"/dashboard/trending"}><p className='text-[#18B451] cursor-pointer'>See all</p></Link>
                        </div>
                        <div className='w-full overflow-x-auto flex gap-4 items-center'>
                            {trendingContent.length > 0 ? (
                                trendingContent.map((content, index) => (
                                    <Link 
                                        key={content._id || index} 
                                        to={`/dashboard/categories/movie/${content._id}`}
                                        className='min-w-[180px] flex-shrink-0'
                                    >
                                        <div className='relative group cursor-pointer'>
                                            <img 
                                                src={content.thumbnail || content.poster || card_2} 
                                                alt={content.title}
                                                className='w-full h-[260px] object-cover rounded-lg'
                                                onError={(e) => e.target.src = card_2}
                                            />
                                            <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center'>
                                                <button 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToWatchlist(content._id);
                                                    }}
                                                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                                                >
                                                    <FaHeart className={`text-2xl ${isInWatchlist(content._id) ? 'text-red-500' : 'text-white'}`} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className='mt-2 text-sm font-medium truncate'>{content.title}</p>
                                        <p className='text-xs text-gray-400'>{content.releaseYear || content.year}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className='text-gray-400 text-sm'>No trending content available</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-4 min-w-[100%] md:min-w-[25rem] md:max-w-[25rem]">
                    <div className='bg-[#0F294E] w-full p-6 shadow-xl rounded-md'>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Exclusives</h2>
                            <div className="bg-[#121214] rounded-md p-1 flex">
                                <button
                                    className={`px-4 py-1 rounded-md text-sm font-medium ${exclusiveTab === 'local' ? 'bg-[#18B451] text-white' : 'bg-transparent text-gray-300'}`}
                                    onClick={() => setExclusiveTab('local')}
                                >
                                    Local
                                </button>
                                <button
                                    className={`px-4 py-1 rounded-md text-sm font-medium ${exclusiveTab === 'global' ? 'bg-[#18B451] text-white' : 'bg-transparent text-gray-300'}`}
                                    onClick={() => setExclusiveTab('global')}
                                >
                                    Global
                                </button>
                            </div>
                        </div>
                        <div>
                            {(exclusiveTab === 'local' ? featuredContent : trendingContent).slice(0, 8).map((item, index) => (
                                <div key={item._id || index} className="flex items-center py-3 border-b border-gray-700 last:border-b-0">
                                    <span className="w-6 text-sm text-gray-400">{index + 1}</span>
                                    <img 
                                        src={item.thumbnail || item.poster || s_card_1} 
                                        alt={item.title} 
                                        className="w-12 h-12 rounded-lg object-cover ml-4"
                                        onError={(e) => e.target.src = s_card_1}
                                    />
                                    <div className="flex-1 ml-4">
                                        <p className="font-medium truncate">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.releaseYear || item.year || 'N/A'}</p>
                                    </div>
                                    <span className="text-sm text-gray-400">{item.duration || 'N/A'}</span>
                                    <FaHeart 
                                        className={`ml-4 cursor-pointer ${isInWatchlist(item._id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                                        onClick={() => handleAddToWatchlist(item._id)}
                                    />
                                    <Link to={`/dashboard/categories/movie/${item._id}`}>
                                        <FaEllipsisH className="text-gray-400 hover:text-white ml-2 cursor-pointer" />
                                    </Link>
                                </div>
                            ))}
                            {(exclusiveTab === 'local' ? featuredContent : trendingContent).length === 0 && (
                                <p className='text-gray-400 text-sm text-center py-4'>No exclusive content available</p>
                            )}
                        </div>
                    </div>
                    <div className='mt-4'>
                        <div className='flex justify-between items-center'>
                            <p>Categories</p>
                            <Link to="/dashboard/categories"><p className='text-[#18B451] cursor-pointer'>See all</p></Link>
                        </div>
                        <Link to="/dashboard/categories">
                            <img src={categories} alt="" className="cursor-pointer" />
                        </Link>
                    </div>
                </div>

            </div>

        </div>
=======
  const isInWatchlist = (contentId) => {
    return watchlist.some(
      (item) => item._id === contentId || item.contentId === contentId
>>>>>>> eb5d3fc8e0791961036007926750490369713dc8
    );
  };

  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18B451] mx-auto"></div>
          <p className="mt-4 text-[#AECFFF]">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <h1 className="text-[#AECFFF]">Welcome Back</h1>
      <p className="text-lg">{user?.name || "User"}</p>

      <div className="md:flex items-start gap-4">
        <div className="mt-4 flex-1">
          <img src={banner} alt="" className="bg-cover w-full" />
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>Recently Played</p>
              <p className="text-[#18B451] cursor-pointer">See all</p>
            </div>
            <div className="w-full overflow-x-auto flex gap-4 items-center">
              {recentContent.length > 0 ? (
                recentContent.map((content, index) => (
                  <Link
                    key={content._id || index}
                    to={`/dashboard/categories/movie/${content._id}`}
                    className="min-w-[180px] flex-shrink-0"
                  >
                    <div className="relative group cursor-pointer">
                      <img
                        src={content.thumbnail || content.poster || card_1}
                        alt={content.title}
                        className="w-full h-[260px] object-cover rounded-lg"
                        onError={(e) => (e.target.src = card_1)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToWatchlist(content._id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaHeart
                            className={`text-2xl ${
                              isInWatchlist(content._id)
                                ? "text-red-500"
                                : "text-white"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium truncate">
                      {content.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {content.releaseYear || content.year}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  No recent content available
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>Top Trending</p>
              <Link to={"/dashboard/trending"}>
                <p className="text-[#18B451] cursor-pointer">See all</p>
              </Link>
            </div>
            <div className="w-full overflow-x-auto flex gap-4 items-center">
              {trendingContent.length > 0 ? (
                trendingContent.map((content, index) => (
                  <Link
                    key={content._id || index}
                    to={`/dashboard/categories/movie/${content._id}`}
                    className="min-w-[180px] flex-shrink-0"
                  >
                    <div className="relative group cursor-pointer">
                      <img
                        src={content.thumbnail || content.poster || card_2}
                        alt={content.title}
                        className="w-full h-[260px] object-cover rounded-lg"
                        onError={(e) => (e.target.src = card_2)}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all rounded-lg flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToWatchlist(content._id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaHeart
                            className={`text-2xl ${
                              isInWatchlist(content._id)
                                ? "text-red-500"
                                : "text-white"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium truncate">
                      {content.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {content.releaseYear || content.year}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  No trending content available
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 min-w-[100%] md:min-w-[25rem] md:max-w-[25rem]">
          <div className="bg-[#0F294E] w-full p-6 shadow-xl rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Exclusives</h2>
              <div className="bg-[#121214] rounded-md p-1 flex">
                <button
                  className={`px-4 py-1 rounded-md text-sm font-medium ${
                    exclusiveTab === "local"
                      ? "bg-[#18B451] text-white"
                      : "bg-transparent text-gray-300"
                  }`}
                  onClick={() => setExclusiveTab("local")}
                >
                  Local
                </button>
                <button
                  className={`px-4 py-1 rounded-md text-sm font-medium ${
                    exclusiveTab === "global"
                      ? "bg-[#18B451] text-white"
                      : "bg-transparent text-gray-300"
                  }`}
                  onClick={() => setExclusiveTab("global")}
                >
                  Global
                </button>
              </div>
            </div>
            <div>
              {(exclusiveTab === "local" ? featuredContent : trendingContent)
                .slice(0, 8)
                .map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center py-3 border-b border-gray-700 last:border-b-0"
                  >
                    <span className="w-6 text-sm text-gray-400">
                      {index + 1}
                    </span>
                    <img
                      src={item.thumbnail || item.poster || s_card_1}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover ml-4"
                      onError={(e) => (e.target.src = s_card_1)}
                    />
                    <div className="flex-1 ml-4">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-gray-400">
                        {item.releaseYear || item.year || "N/A"}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {item.duration || "N/A"}
                    </span>
                    <FaHeart
                      className={`ml-4 cursor-pointer ${
                        isInWatchlist(item._id)
                          ? "text-red-500"
                          : "text-gray-400 hover:text-red-500"
                      }`}
                      onClick={() => handleAddToWatchlist(item._id)}
                    />
                    <Link to={`/dashboard/categories/movie/${item._id}`}>
                      <FaEllipsisH className="text-gray-400 hover:text-white ml-2 cursor-pointer" />
                    </Link>
                  </div>
                ))}
              {(exclusiveTab === "local" ? featuredContent : trendingContent)
                .length === 0 && (
                <p className="text-gray-400 text-sm text-center py-4">
                  No exclusive content available
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>Categories</p>
              <Link
                to={"/dashboard/categories"}
                className="text-[#18B451] cursor-pointer"
              >
                See all
              </Link>
            </div>
            <img src={categories} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
