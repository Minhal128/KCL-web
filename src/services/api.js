import axios from 'axios';
import { VITE_SERVER } from '../constants/config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: VITE_SERVER,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== AUTH APIs ====================
export const authAPI = {
  // Sign up
  signUp: (formData) => apiClient.post('/auth/signup', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Sign in
  signIn: (credentials) => apiClient.post('/auth/signin', credentials),
  
  // Sign out
  signOut: () => apiClient.get('/auth/signout'),
  
  // Forgot password
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  
  // Verify OTP
  verifyOtp: (data) => apiClient.post('/auth/verify-otp', data),
  
  // Reset password
  resetPassword: (data) => apiClient.post('/auth/reset-password', data),
  
  // Send OTP
  sendOtp: (email) => apiClient.post('/auth/send-otp', { email }),
  
  // Verify email
  verifyEmail: (data) => apiClient.post('/auth/verify-email', data),
  
  // Complete onboarding
  onboarding: (data) => apiClient.post('/auth/onboarding', data),
};

// ==================== USER APIs ====================
export const userAPI = {
  // Get user profile
  getProfile: () => apiClient.get('/user'),
  
  // Update profile
  updateProfile: (data) => apiClient.post('/user/update', data),
  
  // Update avatar
  updateAvatar: (formData) => apiClient.put('/user/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Update password
  updatePassword: (data) => apiClient.put('/user/password', data),
  
  // Update interests
  updateInterests: (interests) => apiClient.put('/user/interests', { interests }),
  
  // Update language
  updateLanguage: (language) => apiClient.put('/user/language', { language }),
};

// ==================== CONTENT APIs ====================
export const contentAPI = {
  // Get all content with filters
  getAllContent: (params = {}) => apiClient.get('/content', { params }),
  
  // Get content by ID
  getContentById: (id) => apiClient.get(`/content/${id}`),
  
  // Get featured content
  getFeaturedContent: (limit = 10) => apiClient.get('/content/featured', { 
    params: { limit } 
  }),
  
  // Get content by genre
  getContentByGenre: (genre, limit = 20) => apiClient.get(`/content/genre/${genre}`, {
    params: { limit }
  }),
  
  // Get all genres
  getAllGenres: () => apiClient.get('/content/genres'),
  
  // Get video playback URL
  getVideoPlayback: (id) => apiClient.get(`/content/${id}/playback`),
};

// ==================== WATCHLIST APIs ====================
export const watchlistAPI = {
  // Get user's watchlist
  getWatchlist: () => apiClient.get('/watchlist'),
  
  // Add to watchlist
  addToWatchlist: (contentId) => apiClient.post('/watchlist/add', { contentId }),
  
  // Remove from watchlist
  removeFromWatchlist: (contentId) => apiClient.delete('/watchlist/remove', { 
    data: { contentId } 
  }),
};

// ==================== NOTIFICATION APIs ====================
export const notificationAPI = {
  // Get all notifications
  getNotifications: (params = {}) => apiClient.get('/notifications', { params }),
  
  // Get unread count
  getUnreadCount: () => apiClient.get('/notifications/unread-count'),
  
  // Mark as read
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/read`),
  
  // Mark all as read
  markAllAsRead: () => apiClient.patch('/notifications/mark-all-read'),
  
  // Delete notification
  deleteNotification: (id) => apiClient.delete(`/notifications/${id}`),
  
  // Send notification (admin)
  sendNotification: (data) => apiClient.post('/notifications/send', data),
};

// ==================== SUPPORT APIs ====================
export const supportAPI = {
  // Create support ticket
  createTicket: (data) => apiClient.post('/support/ticket', data),
  
  // Get all user tickets
  getTickets: (params = {}) => apiClient.get('/support/tickets', { params }),
  
  // Get ticket by ID
  getTicketById: (id) => apiClient.get(`/support/ticket/${id}`),
  
  // Add reply to ticket
  addReply: (id, data) => apiClient.post(`/support/ticket/${id}/reply`, data),
  
  // Update ticket status
  updateTicketStatus: (id, status) => apiClient.patch(`/support/ticket/${id}/status`, { status }),
  
  // Get ticket statistics
  getTicketStats: () => apiClient.get('/support/tickets/stats'),
};

// ==================== PAYMENT APIs ====================
export const paymentAPI = {
  // Create payment intent
  createPaymentIntent: (data) => apiClient.post('/payment/create-intent', data),
  
  // Confirm payment
  confirmPayment: (paymentIntentId) => apiClient.post('/payment/confirm', { paymentIntentId }),
  
  // Create checkout session
  createCheckoutSession: (data) => apiClient.post('/payment/create-checkout-session', data),
  
  // Get all transactions
  getTransactions: (params = {}) => apiClient.get('/payment/transactions', { params }),
  
  // Get transaction by ID
  getTransactionById: (id) => apiClient.get(`/payment/transaction/${id}`),
  
  // Get transaction statistics
  getTransactionStats: () => apiClient.get('/payment/transactions/stats'),
};

// ==================== SUBSCRIPTION APIs ====================
export const subscriptionAPI = {
  // Subscribe
  subscribe: (data) => apiClient.post('/payments/subscribe', data),
  
  // Create trial
  createTrial: (data) => apiClient.post('/payments/trial', data),
  
  // Get subscription details
  getSubscription: (id) => apiClient.get(`/payments/${id}`),
  
  // Create payment intent (Stripe)
  createPaymentIntent: (data) => apiClient.post('/payments/create-payment-intent', data),
};

// ==================== DEVICE APIs ====================
export const deviceAPI = {
  // Register device
  registerDevice: (deviceId) => apiClient.post('/devices/register', { deviceId }),
  
  // Remove device
  removeDevice: (deviceId) => apiClient.post('/devices/remove', { deviceId }),
  
  // Get all devices
  getAllDevices: () => apiClient.post('/devices/all'),
};

// ==================== PROFILE APIs ====================
export const profileAPI = {
  // Create profile
  createProfile: (data) => apiClient.post('/profiles/create', data),
  
  // Get all profiles
  getAllProfiles: () => apiClient.get('/profiles'),
  
  // Verify PIN
  verifyPin: (data) => apiClient.post('/profiles/verify-pin', data),
  
  // Update video quality
  updateVideoQuality: (data) => apiClient.put('/profiles/video-quality', data),
  
  // Get watchlist
  getWatchlist: () => apiClient.get('/profiles/watchlist'),
};

// ==================== 2FA APIs ====================
export const twoFactorAPI = {
  // Enable 2FA
  enable: () => apiClient.post('/2fa/enable'),
  
  // Verify 2FA setup
  verify: (token) => apiClient.post('/2fa/verify', { token }),
  
  // Disable 2FA
  disable: (token) => apiClient.post('/2fa/disable', { token }),
  
  // Verify 2FA login
  verifyLogin: (token) => apiClient.post('/2fa/login-verify', { token }),
};

export default {
  authAPI,
  userAPI,
  contentAPI,
  watchlistAPI,
  notificationAPI,
  supportAPI,
  paymentAPI,
  subscriptionAPI,
  deviceAPI,
  profileAPI,
  twoFactorAPI,
};
