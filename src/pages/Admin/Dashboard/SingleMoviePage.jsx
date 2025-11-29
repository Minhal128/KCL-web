import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsSendFill, BsEmojiSmile } from "react-icons/bs";
import { HiOutlineHeart } from "react-icons/hi";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { contentAPI } from '../../../services/api';
import toast from 'react-hot-toast';
import video_url from '../../../assets/dashboard/video.mp4';
import watchlist_1 from '../../../assets/dashboard/watchlist/watchlist_1.png';
import avatar from '../../../assets/dashboard/avatar.png';

const castImages = [
    { name: "Ruth Wafle", src: avatar },
    { name: "Seline Jon", src: avatar },
    { name: "Abel Thom", src: avatar },
    { name: "Dianne Ji", src: avatar },
    { name: "Pter Pyper", src: avatar },
    { name: "Deborah", src: avatar },
    { name: "Angelina Hiel", src: avatar },
];

const TabItem = ({ title, isActive, onClick }) => (
    <div
        className={`px-6 py-3 cursor-pointer ${isActive ? 'border-b-2 border-[#129B7F] font-semibold' : 'text-[#AECFFF] hover:text-white'}`}
        onClick={onClick}
    >
        {title}
    </div>
);

const InfoView = ({ onWriteReview, content }) => (
    <div className='p-6'>
        <div className='flex justify-between items-start'>
            <div>
                <h2 className='text-xl font-bold mb-2'>Reviews</h2>
                <div className='flex items-center space-x-2'>
                    <p className='text-4xl font-semibold'>{content?.rating || 0}</p>
                    <p className='text-lg font-normal text-[#AECFFF]'>/5</p>
                    <div className='flex text-[#FFC107] text-lg'>
                        {[1, 2, 3, 4, 5].map(star => (
                            <React.Fragment key={star}>
                                {star <= content?.rating ? <AiFillStar /> : <AiOutlineStar />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className='px-6 py-2 rounded-full text-base bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451] transition-all'
                onClick={onWriteReview}
            >
                Write review
            </button>
        </div>

        <div className='mt-8'>
            <h3 className='text-lg font-bold mb-1'>Movie Details</h3>
            <div className='grid grid-cols-2 gap-4 mt-3'>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Type</p>
                    <p className='text-white capitalize'>{content?.type || 'N/A'}</p>
                </div>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Genre</p>
                    <p className='text-white'>{content?.genre?.join(', ') || 'N/A'}</p>
                </div>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Release Year</p>
                    <p className='text-white'>{content?.releaseYear || 'N/A'}</p>
                </div>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Duration</p>
                    <p className='text-white'>{content?.duration || 'N/A'}</p>
                </div>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Rating</p>
                    <p className='text-white'>{content?.contentRating || 'N/A'}</p>
                </div>
                <div>
                    <p className='text-sm text-[#AECFFF]'>Language</p>
                    <p className='text-white'>{content?.language || 'N/A'}</p>
                </div>
            </div>
        </div>

        <div className='mt-6'>
            <h3 className='text-lg font-bold mb-2'>Description</h3>
            <p className='text-[#AECFFF] leading-relaxed'>
                {content?.description || 'No description available.'}
            </p>
        </div>

        {content?.cast && content.cast.length > 0 && (
            <div className='mt-6'>
                <h3 className='text-lg font-bold mb-4'>Cast</h3>
                <div className='flex overflow-x-auto space-x-4 pb-2'>
                    {content.cast.map((actor, index) => (
                        <div key={index} className='flex flex-col items-center flex-shrink-0 w-20'>
                            <img src={actor.image || avatar} alt={actor.name} className='w-14 h-14 rounded-full object-cover border-2 border-[#129B7F]' onError={(e) => e.target.src = avatar} />
                            <p className='text-xs mt-2 text-center truncate w-full'>{actor.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const CommentsView = ({ contentId }) => {
    const [comments, setComments] = useState([
        { name: "Mike Newell", time: "1 hr ago", comment: "I so much love the movie, top notch", likes: 414, dislikes: 14, replies: 15, avatar: avatar },
        { name: "Michael", time: "1 hr ago", comment: "I so much love the movie, top notch. It'd have been lovely if I see my favorite actress there", likes: 414, dislikes: 14, replies: 15, avatar: avatar },
        { name: "Nicholas", time: "1 hr ago", comment: "So much joy to behold in all the series. I literally forget to go to work cos I slept off as a result of over watching, lol", likes: 414, dislikes: 14, replies: 15, avatar: avatar },
        { name: "Michael", time: "1 hr ago", comment: "I so much love the movie, top notch. It'd have been lovely if I see my favorite actress there", likes: 414, dislikes: 14, replies: 15, avatar: avatar },
    ]);
    const [newComment, setNewComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            setSubmitting(true);
            // TODO: Replace with actual API call when backend endpoint is ready
            // await contentAPI.addComment(contentId, { comment: newComment });
            
            // For now, add comment locally
            const comment = {
                name: "You",
                time: "Just now",
                comment: newComment,
                likes: 0,
                dislikes: 0,
                replies: 0,
                avatar: avatar
            };
            setComments([comment, ...comments]);
            setNewComment('');
            toast.success('Comment posted successfully!');
        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment');
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment();
        }
    };

    return (
        <div className=''>
            <div className=''>
                {comments.map((comment, index) => (
                    <div key={index} className='flex items-start space-x-3 border-b border-b-[#37619E] p-6'>
                        <img src={comment.avatar} alt={comment.name} className='w-10 h-10 rounded-full object-cover' />
                        <div className='flex-1'>
                            <div className='flex items-center justify-between'>
                                <p className='font-semibold'>{comment.name}</p>
                                <p className='text-xs text-[#AECFFF]'>{comment.time}</p>
                            </div>
                            <p className='mt-1 text-sm'>{comment.comment}</p>
                            <div className='flex items-center space-x-4 mt-2 text-xs text-[#AECFFF]'>
                                <div className='flex items-center space-x-1 cursor-pointer hover:text-white'>
                                    <FiThumbsUp />
                                    <span>{comment.likes}</span>
                                </div>
                                <div className='flex items-center space-x-1 cursor-pointer hover:text-white'>
                                    <FiThumbsDown />
                                    <span>{comment.dislikes}</span>
                                </div>
                                <div className='flex items-center space-x-1 cursor-pointer hover:text-white'>
                                    <HiOutlineHeart className='text-base' />
                                    <span>{comment.replies}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-8 flex items-center bg-[#0F294E] rounded-md px-4 py-3'>
                <div className='flex items-center gap-x-3 bg-[#21477C] flex-1 p-3 rounded-full'>
                    <BsEmojiSmile className='text-xl text-[#AECFFF] cursor-pointer' />
                    <input 
                        type='text' 
                        placeholder='Type in your comment' 
                        className='flex-1 bg-transparent focus:outline-none text-white placeholder-[#AECFFF]'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={submitting}
                    />
                </div>
                <button 
                    className='ml-3 text-[#129B7F] hover:text-[#4DBB9C] disabled:opacity-50'
                    onClick={handleSubmitComment}
                    disabled={submitting}
                >
                    <BsSendFill className='text-2xl' />
                </button>
            </div>
        </div>
    );
};

const RelatedMoviesView = ({ relatedMovies }) => {

    if (!relatedMovies || relatedMovies.length === 0) {
        return (
            <div className='p-6 text-center text-gray-400'>
                <p>No related movies found</p>
            </div>
        );
    }

    return (
        <div className='p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {relatedMovies.map((movie, index) => (
                <Link key={movie._id || index} to={`/dashboard/categories/movie/${movie._id}`} className='relative group cursor-pointer'>
                    <img src={movie.thumbnail || movie.poster || watchlist_1} alt={movie.title} className='rounded-lg object-cover w-full h-[200px]' onError={(e) => e.target.src = watchlist_1} />
                    <div className='absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent'>
                        <p className='font-semibold truncate text-sm'>{movie.title}</p>
                        <p className='text-xs text-[#AECFFF]'>{movie.releaseYear}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

const WriteReviewModal = ({ onClose, contentId }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }
        if (!reviewText.trim()) {
            toast.error('Please write a review');
            return;
        }

        try {
            setSubmitting(true);
            // TODO: Replace with actual API call when backend endpoint is ready
            // await contentAPI.addReview(contentId, { rating, review: reviewText });
            
            toast.success('Review submitted successfully!');
            onClose();
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm'>
            <div className='bg-[#0F294E] p-6 rounded-xl w-full max-w-md shadow-2xl'>
                <div className='flex justify-end items-center mb-1'>
                    <button onClick={onClose} className='text-white hover:text-[#AECFFF] text-2xl'>&times;</button>
                </div>

                <h3 className='text-xl text-center mb-2'>Write review</h3>

                <div className='mb-2 bg-[#193866CC] p-3 rounded-md'>

                    <div className='flex items-center gap-x-3 border-b border-b-[#21477C] pb-2'>
                        <p className=''>Select ratings</p>
                        <div className='flex text-lg'>
                            {[1, 2, 3, 4, 5].map(star => (
                                <button key={star} onClick={() => setRating(star)} className={`transition-colors ${star <= rating ? 'text-[#FFC107]' : 'text-gray-500'} hover:text-[#FFC107]`}>
                                    <AiFillStar />
                                </button>
                            ))}
                        </div>
                    </div>

                    <textarea 
                        placeholder='Write something' 
                        rows='2' 
                        className='w-full bg-transparent py-3 outline-none border-none resize-none text-white placeholder-[#AECFFF]'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        disabled={submitting}
                    ></textarea>
                </div>

                <button
                    className='w-full mt-6 py-3 rounded-full text-base bg-gradient-to-r from-[#18B451] to-[#4DBB9C] hover:from-[#4DBB9C] hover:to-[#18B451] transition-all disabled:opacity-50'
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

const SingleMoviePage = () => {
    const { id } = useParams();
    const [activeView, setActiveView] = useState('Related Movies');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchContent();
        }
    }, [id]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await contentAPI.getContentById(id);
            const contentData = response.data?.data;
            setContent(contentData);

            // Fetch related movies based on the first genre
            if (contentData?.genre && contentData.genre.length > 0) {
                try {
                    const relatedResponse = await contentAPI.getContentByGenre(contentData.genre[0], 10);
                    const related = relatedResponse.data?.data || [];
                    // Filter out the current movie
                    setRelatedMovies(related.filter(item => item._id !== id));
                } catch (error) {
                    console.error('Error fetching related content:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching content:', error);
            toast.error('Failed to load content');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (activeView) {
            case 'Related Movies':
                return <RelatedMoviesView relatedMovies={relatedMovies} />;
            case 'Comments':
                return <CommentsView contentId={id} />;
            case 'Info':
            default:
                return <InfoView onWriteReview={() => setIsModalOpen(true)} content={content} />;
        }
    };

    if (loading) {
        return (
            <div className='text-white flex justify-center items-center h-[50vh]'>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18B451]"></div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className='text-white text-center py-20'>
                <p className='text-2xl'>Content not found</p>
                <Link to='/dashboard/home' className='text-[#18B451] hover:underline mt-4 inline-block'>
                    Go back to home
                </Link>
            </div>
        );
    }

    return (
        <div className='text-white'>
            {/* Breadcrumb Header */}
            <div className='h-[3rem] px-4 bg-[#21477C] -mx-5 -mt-5 flex items-center gap-x-2'>
                <Link to='/dashboard/categories' className='text-[#AECFFF] hover:text-white'>Categories</Link>
                <IoIosArrowForward />
                <p className='text-[#AECFFF] capitalize'>{content.genre?.[0] || 'Unknown'}</p>
                <IoIosArrowForward />
                <p>{content.title}</p>
            </div>

            {/* Video Player */}
            <div className='my-3'>
                {content.videoUrl ? (
                    <video 
                        src={content.videoUrl} 
                        poster={content.thumbnail || content.poster}
                        autoPlay={false} 
                        controls 
                        className='bg-cover w-full h-[50vh] bg-[#0F294E] rounded-md' 
                    />
                ) : (
                    <div className='w-full h-[50vh] bg-[#0F294E] rounded-md flex items-center justify-center'>
                        <img src={content.thumbnail || content.poster || watchlist_1} alt={content.title} className='max-h-full max-w-full object-contain' onError={(e) => e.target.src = watchlist_1} />
                    </div>
                )}
            </div>

            {/* VIEWS (Tabs) */}
            <div className='flex border-b border-[#21477C]'>
                <TabItem
                    title='Related Movies'
                    isActive={activeView === 'Related Movies'}
                    onClick={() => setActiveView('Related Movies')}
                />
                <TabItem
                    title={`Comments(20K)`}
                    isActive={activeView === 'Comments'}
                    onClick={() => setActiveView('Comments')}
                />
                <TabItem
                    title='Info'
                    isActive={activeView === 'Info'}
                    onClick={() => setActiveView('Info')}
                />
            </div>

            {/* View Content */}
            <div className='bg-[#0F294E] -mx-5'>
                {renderContent()}
            </div>

            {/* Write Review Modal */}
            {isModalOpen && <WriteReviewModal onClose={() => setIsModalOpen(false)} contentId={id} />}
        </div>
    );
}

export default SingleMoviePage;