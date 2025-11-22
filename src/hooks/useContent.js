import { useState, useCallback } from 'react';
import { contentAPI, watchlistAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Custom hook for content management
 * Handles fetching content, managing watchlists, and content state
 */
export const useContent = () => {
  const [featuredContent, setFeaturedContent] = useState([]);
  const [recentContent, setRecentContent] = useState([]);
  const [trendingContent, setTrendingContent] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all types of content
   */
  const fetchAllContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [featuredRes, recentRes, trendingRes, genresRes, watchlistRes] = await Promise.all([
        contentAPI.getFeaturedContent(10).catch(() => ({ data: { data: [] } })),
        contentAPI.getAllContent({ page: 1, limit: 20 }).catch(() => ({ data: { data: { content: [] } } })),
        contentAPI.getAllContent({ page: 1, limit: 20, isFeatured: true }).catch(() => ({ data: { data: { content: [] } } })),
        contentAPI.getAllGenres().catch(() => ({ data: { data: [] } })),
        watchlistAPI.getWatchlist().catch(() => ({ data: { wishlist: [] } }))
      ]);

      setFeaturedContent(featuredRes.data?.data || []);
      setRecentContent(recentRes.data?.data?.content || []);
      setTrendingContent(trendingRes.data?.data?.content || []);
      setAllContent(recentRes.data?.data?.content || []);
      setGenres(genresRes.data?.data || []);
      setWatchlist(watchlistRes.data?.wishlist || []);
    } catch (err) {
      console.error('Error fetching content:', err);
      setError(err.message || 'Failed to load content');
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch content by genre
   */
  const fetchContentByGenre = useCallback(async (genre, limit = 20) => {
    try {
      setLoading(true);
      setError(null);

      const response = await contentAPI.getContentByGenre(genre, limit);
      setAllContent(response.data?.data || []);
    } catch (err) {
      console.error('Error fetching content by genre:', err);
      setError(err.message || 'Failed to load genre content');
      toast.error('Failed to load genre content');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch content with filters
   */
  const fetchContentWithFilters = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const response = await contentAPI.getAllContent(filters);
      setAllContent(response.data?.data?.content || []);
      return response.data?.data;
    } catch (err) {
      console.error('Error fetching filtered content:', err);
      setError(err.message || 'Failed to load content');
      toast.error('Failed to load content');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Add content to watchlist
   */
  const addToWatchlist = useCallback(async (contentId) => {
    try {
      await watchlistAPI.addToWatchlist(contentId);
      toast.success('Added to watchlist!');
      
      // Refresh watchlist
      const response = await watchlistAPI.getWatchlist();
      setWatchlist(response.data?.wishlist || []);
      return true;
    } catch (err) {
      console.error('Error adding to watchlist:', err);
      toast.error(err.response?.data?.message || 'Failed to add to watchlist');
      return false;
    }
  }, []);

  /**
   * Remove content from watchlist
   */
  const removeFromWatchlist = useCallback(async (contentId) => {
    try {
      await watchlistAPI.removeFromWatchlist(contentId);
      toast.success('Removed from watchlist!');
      
      // Refresh watchlist
      const response = await watchlistAPI.getWatchlist();
      setWatchlist(response.data?.wishlist || []);
      return true;
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      toast.error(err.response?.data?.message || 'Failed to remove from watchlist');
      return false;
    }
  }, []);

  /**
   * Check if content is in watchlist
   */
  const isInWatchlist = useCallback((contentId) => {
    return watchlist.some(item => item._id === contentId || item.contentId === contentId);
  }, [watchlist]);

  /**
   * Toggle watchlist status
   */
  const toggleWatchlist = useCallback(async (contentId) => {
    if (isInWatchlist(contentId)) {
      return await removeFromWatchlist(contentId);
    } else {
      return await addToWatchlist(contentId);
    }
  }, [isInWatchlist, addToWatchlist, removeFromWatchlist]);

  /**
   * Get content by ID
   */
  const getContentById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await contentAPI.getContentById(id);
      return response.data?.data;
    } catch (err) {
      console.error('Error fetching content details:', err);
      setError(err.message || 'Failed to load content details');
      toast.error('Failed to load content details');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    featuredContent,
    recentContent,
    trendingContent,
    allContent,
    genres,
    watchlist,
    loading,
    error,
    
    // Methods
    fetchAllContent,
    fetchContentByGenre,
    fetchContentWithFilters,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    toggleWatchlist,
    getContentById,
  };
};

export default useContent;
