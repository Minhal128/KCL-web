import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../../../services/api';
import { FaBell, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, unread, read

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();
    }, [filter]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const params = filter === 'unread' ? { isRead: false } : filter === 'read' ? { isRead: true } : {};
            const response = await notificationAPI.getNotifications(params);
            setNotifications(response.data?.data?.notifications || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await notificationAPI.getUnreadCount();
            setUnreadCount(response.data?.data?.unreadCount || 0);
        } catch (error) {
            console.error('Error fetching unread count:', error);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await notificationAPI.markAsRead(id);
            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            toast.error('Failed to mark as read');
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationAPI.markAllAsRead();
            toast.success('All notifications marked as read');
            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            toast.error('Failed to mark all as read');
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await notificationAPI.deleteNotification(id);
            toast.success('Notification deleted');
            fetchNotifications();
            fetchUnreadCount();
        } catch (error) {
            toast.error('Failed to delete notification');
        }
    };

    const getNotificationIcon = (type) => {
        const iconClass = "text-2xl";
        switch (type) {
            case 'content':
                return <FaBell className={`${iconClass} text-blue-500`} />;
            case 'payment':
                return <FaBell className={`${iconClass} text-green-500`} />;
            case 'subscription':
                return <FaBell className={`${iconClass} text-purple-500`} />;
            case 'system':
                return <FaBell className={`${iconClass} text-yellow-500`} />;
            default:
                return <FaBell className={`${iconClass} text-[#18B451]`} />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className='text-white'>
                <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center justify-between gap-x-4'>
                    <p>Notifications</p>
                </div>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18B451]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className='text-white'>
            <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center justify-between gap-x-4'>
                <div className="flex items-center gap-4">
                    <p className="text-xl font-bold">Notifications</p>
                    {unreadCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm bg-[#18B451] px-4 py-1 rounded-md hover:bg-[#16a049] transition"
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            {/* Filter buttons */}
            <div className="mt-6 flex gap-2">
                {['all', 'unread', 'read'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-md capitalize transition ${
                            filter === f
                                ? 'bg-[#18B451] text-white'
                                : 'bg-[#1C365A] text-gray-400 hover:bg-[#21477C]'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Notifications list */}
            <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification._id}
                        className={`bg-[#0F294E] p-4 rounded-lg shadow-lg ${
                            !notification.isRead ? 'border-l-4 border-[#18B451]' : ''
                        }`}
                        onClick={() => !notification.isRead && handleMarkAsRead(notification._id)}
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {notification.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-1">
                                            {notification.message}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">
                                            {formatTime(notification.createdAt)}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteNotification(notification._id);
                                            }}
                                            className="text-gray-400 hover:text-red-500 transition"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </div>
                                {!notification.isRead && (
                                    <span className="inline-block mt-2 text-xs bg-[#18B451] px-2 py-1 rounded">
                                        New
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {notifications.length === 0 && (
                <div className="text-center py-20">
                    <FaBell className="text-6xl text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                        {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
                    </p>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
