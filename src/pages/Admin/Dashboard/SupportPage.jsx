import React, { useState, useEffect } from 'react';
import { supportAPI } from '../../../services/api';
import { FaTicketAlt, FaCommentDots, FaPaperPlane, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SupportPage = () => {
    const [tickets, setTickets] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newTicket, setNewTicket] = useState({
        subject: '',
        description: '',
        category: 'technical',
        priority: 'medium'
    });

    useEffect(() => {
        fetchTickets();
        fetchStats();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            const response = await supportAPI.getTickets();
            setTickets(response.data?.data?.tickets || []);
        } catch (error) {
            console.error('Error fetching tickets:', error);
            toast.error('Failed to load support tickets');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await supportAPI.getTicketStats();
            setStats(response.data?.data || null);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleCreateTicket = async (e) => {
        e.preventDefault();
        try {
            await supportAPI.createTicket(newTicket);
            toast.success('Support ticket created successfully!');
            setNewTicket({ subject: '', description: '', category: 'technical', priority: 'medium' });
            setShowCreateForm(false);
            fetchTickets();
            fetchStats();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create ticket');
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            open: 'bg-blue-500',
            in_progress: 'bg-yellow-500',
            resolved: 'bg-green-500',
            closed: 'bg-gray-500'
        };
        return badges[status] || 'bg-gray-500';
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            low: 'bg-gray-500',
            medium: 'bg-yellow-500',
            high: 'bg-red-500'
        };
        return badges[priority] || 'bg-gray-500';
    };

    if (loading) {
        return (
            <div className='text-white'>
                <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-4'>
                    <p>Help Center</p>
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
                <p className="text-xl font-bold">Help Center</p>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="bg-[#18B451] px-4 py-2 rounded-md hover:bg-[#16a049] transition"
                >
                    {showCreateForm ? 'Cancel' : 'Create Ticket'}
                </button>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(stats).filter(([key]) => key !== 'total').map(([key, value]) => (
                        <div key={key} className="bg-[#0F294E] p-4 rounded-lg">
                            <p className="text-gray-400 text-sm capitalize">{key.replace('_', ' ')}</p>
                            <p className="text-2xl font-bold mt-1">{value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Support Options */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Tell us how we can be of help</h2>
                <p className="text-gray-400 mb-6">Our crew of support are standing by for service & support</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#0F294E] p-6 rounded-lg cursor-pointer hover:bg-[#1C365A] transition">
                        <FaCommentDots className="text-3xl text-[#18B451] mb-3" />
                        <h3 className="text-lg font-semibold mb-2">Chat with us</h3>
                        <p className="text-sm text-gray-400">Start a conversation with our support</p>
                    </div>
                    <div className="bg-[#0F294E] p-6 rounded-lg cursor-pointer hover:bg-[#1C365A] transition">
                        <FaEnvelope className="text-3xl text-[#18B451] mb-3" />
                        <h3 className="text-lg font-semibold mb-2">Send us an email</h3>
                        <p className="text-sm text-gray-400">Send your solution beamed into your email</p>
                    </div>
                </div>
            </div>

            {/* Create Ticket Form */}
            {showCreateForm && (
                <div className="mt-6 bg-[#0F294E] p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Create Support Ticket</h3>
                    <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                value={newTicket.subject}
                                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                                className="w-full bg-[#1C365A] border border-[#21477C] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#18B451]"
                                required
                                placeholder="Brief description of your issue"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                value={newTicket.description}
                                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                                className="w-full bg-[#1C365A] border border-[#21477C] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#18B451] h-32"
                                required
                                placeholder="Detailed description of your problem..."
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    value={newTicket.category}
                                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                                    className="w-full bg-[#1C365A] border border-[#21477C] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#18B451]"
                                >
                                    <option value="technical">Technical</option>
                                    <option value="billing">Billing</option>
                                    <option value="content">Content</option>
                                    <option value="account">Account</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Priority</label>
                                <select
                                    value={newTicket.priority}
                                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                                    className="w-full bg-[#1C365A] border border-[#21477C] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#18B451]"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#18B451] text-white py-3 rounded-lg hover:bg-[#16a049] transition flex items-center justify-center gap-2"
                        >
                            <FaPaperPlane />
                            Submit Ticket
                        </button>
                    </form>
                </div>
            )}

            {/* Tickets List */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Your Support Tickets</h3>
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div key={ticket._id} className="bg-[#0F294E] p-4 rounded-lg hover:bg-[#1C365A] transition cursor-pointer">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-gray-400 text-sm font-mono">
                                            #{ticket.ticketNumber}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(ticket.status)}`}>
                                            {ticket.status.replace('_', ' ')}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(ticket.priority)}`}>
                                            {ticket.priority}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg mb-1">{ticket.subject}</h4>
                                    <p className="text-gray-400 text-sm line-clamp-2">{ticket.description}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Created: {new Date(ticket.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <FaTicketAlt className="text-2xl text-[#18B451]" />
                            </div>
                        </div>
                    ))}
                </div>

                {tickets.length === 0 && !showCreateForm && (
                    <div className="text-center py-20">
                        <FaTicketAlt className="text-6xl text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-4">No support tickets yet</p>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="bg-[#18B451] px-6 py-2 rounded-md hover:bg-[#16a049] transition"
                        >
                            Create Your First Ticket
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportPage;
