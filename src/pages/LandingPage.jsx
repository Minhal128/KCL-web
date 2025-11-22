import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaMobileAlt, FaTablet, FaTv, FaLaptop, FaGamepad, FaVrCardboard, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Pattern from '../assets/pattern.png'
import Dashboard from '../assets/dashboard.png'
import Card1 from '../assets/card_1.png'
import Card2 from '../assets/card_2.png'
import Card3 from '../assets/card_3.png'
import Card4 from '../assets/card_4.png'
import free_trial from '../assets/free_trial.png'
import Logo from '../assets/logo.png';

const features = [
    {
        icon: FaMobileAlt,
        title: "Smartphones",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
        icon: FaTablet,
        title: "Tablet",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
        icon: FaTv,
        title: "Smart TV",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
        icon: FaLaptop,
        title: "Laptops",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
        icon: FaGamepad,
        title: "Gaming Consoles",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
    {
        icon: FaVrCardboard,
        title: "VR Headsets",
        description: "KCL is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store"
    },
];

const pricingPlans = [
    {
        name: "Basic Plan",
        price: "$9.99",
        duration: "/month",
        description: "Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.",
    },
    {
        name: "Standard Plan",
        price: "$12.99",
        duration: "/month",
        description: "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
    },
    {
        name: "Premium Plan",
        price: "$14.99",
        duration: "/month",
        description: "Access to a widest selection of movies and shows, including all new releases and Offline Viewing."
    },
];

const genres = [
    {
        title: "Action",
        image: Card1,
    },
    {
        title: "Adventure",
        image: Card2,
    },
    {
        title: "Comedy",
        image: Card3,
    },
    {
        title: "Drama",
        image: Card4,
    },
];

const faqs = [
    {
        question: "What is KCL all about?",
        answer: "KCL is a leading streaming platform offering a diverse library of movies and shows, including exclusive originals, blockbusters, and documentaries. Our mission is to provide seamless entertainment, tailored to your preferences, anytime, anywhere."
    },
    {
        question: "Is streaming available worldwide?",
        answer: "Yes, our service is available in multiple countries. Some content may vary based on your region due to licensing agreements."
    },
    {
        question: "What kind of content is available?",
        answer: "We offer a wide range of content, including new releases, classic films, popular TV series, documentaries, and exclusive KCL originals across all genres."
    },
    {
        question: "Can I watch on multiple devices?",
        answer: "Yes, KCL is compatible with smartphones, tablets, smart TVs, laptops, gaming consoles, and VR headsets."
    },
    {
        question: "How does the subscription work?",
        answer: "We offer flexible subscription plans—Basic, Standard, and Premium—each with different features. You can choose a monthly or yearly subscription, and you can cancel anytime."
    },
];

const LandingPage = () => {
    const [openFaq, setOpenFaq] = useState(1);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };
    return (
        <div className="text-white bg-[#112F5A] w-screen h-screen overflow-y-auto">
            <Navbar />

            <div className=''>
                <div style={{ background: `url(${Pattern})` }} className='flex justify-center items-center flex-col lg:px-8 py-20 bg-cover'>
                    <p className='text-[30px] sm:text-[64px] text-center font-medium'>Discover Seamless Streaming</p>
                    <p className='text-[30px] sm:text-[64px] text-center font-medium -mt-2'>Experience With KCL</p>
                    <p className='text-center text-[#C5DDFF] text-[1rem] sm:text-[24px] mt-5'>Stream the stories you love, discover new favorites, and <br /> enjoy exclusive premieres. Watch anywhere, anytime</p>
                    <button className="w-[308px] h-[68px] mt-10 rounded-[500px] bg-[#12B037] text-white text-[21.54px] font-medium shadow-[0_11px_29px_0_rgba(20,169,144,0.3)] hover:opacity-90 transition-opacity duration-200">Start Watching</button>
                    <img src={Dashboard} alt="" />
                </div>
                <div className='bg-[#112F5A] py-10'>
                    <div className="text-center">
                        <h2 className="text-white text-[20px] sm:text-[44px] font-semibold">From Pocket to Big Screen</h2>
                        <p className="text-[#C5DDFF] text-lg sm:text-xl mt-3">Stream on the go with your phone or enjoy <br /> cinematic moments on your smart TV.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:p-10 lg:px-20 mt-10">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
                                <div className='flex items-center gap-x-2 mb-4'>
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex justify-center items-center">
                                        <feature.icon className="text-3xl text-white/80" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-[#C5DDFF] mt-2">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-white py-10'>
                    <div className="text-center text-[#112F5A]">
                        <h2 className="text-[20px] sm:text-[44px] font-semibold">Flexible Plans for Every Viewer</h2>
                        <p className="text-[#112F5A] text-lg sm:text-xl mt-3">Choose the subscription that fits your lifestyle — monthly, yearly, or pay-per-view</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 md:p-10 lg:px-20 mt-10">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className="flex flex-col px-8 py-4 rounded-lg border border-gray-300 shadow-md bg-[#dddddd]">
                                <h3 className="text-2xl font-semibold text-[#112F5A]">{plan.name}</h3>
                                <p className="text-sm  text-[#8C9BB4] mt-2">
                                    {plan.description}
                                </p>
                                <div className=" mt-4">
                                    <span className="text-4xl font-bold text-[#112F5A]">{plan.price}</span>
                                    <span className="text-lg text-[#8C9BB4]">{plan.duration}</span>
                                </div>
                                <div className="flex justify-center gap-x-4 mt-8">
                                    <button className="flex-1 py-3 px-6 rounded-full bg-[#828A92] text-[#fff] font-semibold transition-colors duration-200">Start Free Trial</button>
                                    <button className="flex-1 py-3 px-6 rounded-full bg-[#12B037] text-white font-semibold hover:opacity-90 transition-opacity duration-200">Choose Plan</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-[#112F5A] py-10'>
                    <div className="text-center">
                        <h2 className="text-white text-[20px] sm:text-[44px] font-semibold">Explore Every Genre, Find Your Next Favorite</h2>
                        <p className="text-[#C5DDFF] text-lg sm:text-xl mt-3">From action-packed blockbusters to heartfelt dramas, comedies, documentaries,</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-10 lg:px-20 mt-10">
                        {genres.map((genre, index) => (
                            <div key={index} className="flex flex-col p-6 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm shadow-[0_10px_20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                                <img src={genre.image} alt={genre.title} className="w-full h-auto rounded-lg mb-4" />
                                <div className="">
                                    <div className="bg-[#12B037] text-white text-xs font-medium px-2 py-1 rounded-md w-fit mb-2">Top 10 in</div>
                                    <div className="flex items-center justify-between">
                                        <p className="">{genre.title}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-[#112F5A] py-10'>
                    <div className="text-center">
                        <h2 className="text-white text-[20px] sm:text-[44px] font-semibold">Everything You Need to Know</h2>
                        <p className="text-[#C5DDFF] text-lg sm:text-xl mt-3">From action-packed blockbusters to heartfelt dramas, comedies, documentaries,</p>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 mt-10 space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white/5 rounded-lg border border-white/10">
                                <button
                                    className="w-full p-6 text-left flex justify-between items-center"
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="text-xl font-semibold text-white">{faq.question}</span>
                                    {openFaq === index ? <FaMinus /> : <FaPlus />}
                                </button>
                                {openFaq === index && (
                                    <div className="p-6 pt-0 text-white/80">
                                        <p>{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-screen py-10'>
                    <img src={free_trial} alt="" className='w-full cursor-pointer' />
                </div>
                <footer className='w-screen bg-[#112F5A] py-10 text-white'>
                    <div className='px-6 lg:px-12'>
                        
                        <div className='flex flex-col md:flex-row justify-between items-start border-b border-gray-600 pb-10 mb-6'>
                            <div className='w-full md:w-2/5'>
                                
                                <div className='flex items-center mb-4 md:mb-0 md:mr-6'>
                                    <img src={Logo} alt="KCL Movies Logo" className='h-10 w-auto' />
                                </div>
                                <p className='text-sm text-[#C5DDFF]'>
                                    Stream the stories you love, discover new favorites, and enjoy exclusive premieres.
                                </p>
                            </div>

                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 md:gap-x-12 mt-8 md:mt-0 w-full md:w-3/5'>
                                <div className='flex flex-col space-y-2'>
                                    <h4 className='text-[18px] font-medium mb-2'>Home</h4>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Categories</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Devices</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Pricing</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>FAQ</a>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <h4 className='text-[18px] font-medium mb-2'>Movies</h4>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Genres</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Trending</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>New Release</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Popular</a>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <h4 className='text-[18px] font-medium mb-2'>Support</h4>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Contact Us</a>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <h4 className='text-[18px] font-medium mb-2'>Subscription</h4>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Plans</a>
                                    <a href='#' className='text-sm text-[#C5DDFF] hover:underline'>Features</a>
                                </div>
                                <div className='flex flex-col items-start'>
                                    <h4 className='text-[18px] font-medium mb-2'>Connect With Us</h4>
                                    <div className='flex space-x-4'>
                                        <a href='#' aria-label='Facebook' className='text-[#C5DDFF] hover:text-white transition-colors duration-200'>
                                            <FaFacebookF size={20} />
                                        </a>
                                        <a href='#' aria-label='Twitter' className='text-[#C5DDFF] hover:text-white transition-colors duration-200'>
                                            <FaTwitter size={20} />
                                        </a>
                                        <a href='#' aria-label='LinkedIn' className='text-[#C5DDFF] hover:text-white transition-colors duration-200'>
                                            <FaLinkedinIn size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between items-center text-sm text-[#8C9BB4]'>
                            <p>©2025 KCL Movies. All Rights Reserved</p>
                            <div className='flex space-x-6 mt-4 md:mt-0'>
                                <a href='#' className='hover:underline'>Terms of Use</a>
                                <a href='#' className='hover:underline'>Privacy Policy</a>
                                <a href='#' className='hover:underline'>Cookie Policy</a>
                            </div>
                        </div>
                        
                    </div>
                </footer>
            </div>

        </div>
    );
};

export default LandingPage;
