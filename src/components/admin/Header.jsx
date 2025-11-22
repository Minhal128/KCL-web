import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from "../../context/SidebarContext";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/dashboard/avatar.png";
import { FaSearch, FaBell, FaChevronDown, FaRegBell } from "react-icons/fa";
import { useUser } from "../../context/UserContext";
import { notificationAPI } from "../../services/api";

const Header = ({ location }) => {
  const { isNavOpen, toggleNav } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getNotifications({ limit: 5 });
      setNotifications(response.data?.data?.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
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

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await notificationAPI.markAsRead(notification._id);
        fetchNotifications();
        fetchUnreadCount();
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      fetchNotifications();
      fetchUnreadCount();
    }
  };

  const navigateToNotifications = () => {
    setIsModalOpen(false);
    navigate('/dashboard/notifications');
  };

  return (
    <div className="w-full flex justify-between items-center py-2 px-5 bg-[#0F294E] text-white">
      <div className="lg:hidden flex items-center gap-x-4">
        <GiHamburgerMenu
          className="lg:hidden block text-xl cursor-pointer"
          onClick={() => toggleNav(!isNavOpen)}
        />
        <h1 className="capitalize font-medium text-lg">
          {location === "home" ? "Dashboard" : location}
        </h1>
      </div>

      <div className="flex justify-between lg:flex-1 items-center gap-x-4">
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search movies"
            className="w-[40vw] bg-[#112F5A] rounded-full py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#12B037]"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-x-4">
          <div className="relative">
            <FaBell className="text-xl cursor-pointer" onClick={toggleModal} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>

          {/* Profile Section */}
          <Link
            to={"/dashboard/profile"}
            className="flex items-center gap-x-2 cursor-pointer"
          >
            <img
              src={user?.avatar}
              alt="User Avatar"
              className="h-8 w-8 rounded-full border-2 border-[#12B037]"
            />
            <span className="hidden md:block font-medium">{user?.name}</span>
            <FaChevronDown className="text-sm hidden md:block" />
          </Link>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/50">
          <div className="bg-[#112F5A] rounded-lg p-6 w-11/12 max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={toggleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button
                onClick={navigateToNotifications}
                className="text-sm text-[#12B037] hover:text-[#16a049] transition"
              >
                View All
              </button>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#12B037]"></div>
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item._id}
                    className={`flex items-start gap-x-4 p-3 rounded-md cursor-pointer transition ${
                      item.isRead ? 'bg-white/5' : 'bg-[#12B037]/10 border-l-2 border-[#12B037]'
                    } hover:bg-white/10`}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <FaRegBell className="text-[#12B037] text-lg mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <span className="text-xs text-[#C5DDFF] whitespace-nowrap">
                          {formatTime(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-[#C5DDFF] line-clamp-2">{item.message}</p>
                      {!item.isRead && (
                        <span className="inline-block mt-1 text-xs bg-[#12B037] px-2 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#C5DDFF]">
                <FaRegBell className="text-4xl mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
