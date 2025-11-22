
import { RiHomeFill, RiMovie2AiFill, RiMovie2Fill, RiMovieAiFill } from 'react-icons/ri';
import { PiListStarFill } from 'react-icons/pi';
import { IoDownloadOutline } from 'react-icons/io5';

export const adminNav = [
    {
        id: 1,
        link: "home",
        name: "Home",
        icon: <RiHomeFill  className='text-[#fff]' />
    },
    {
        id: 2,
        link: "categories",
        name: "Categories",
        icon: <RiMovie2AiFill className='text-[#fff]' />
    },
    {
        id: 3,
        link: "explore",
        name: "Explore",
        icon: <RiMovie2Fill className='text-[#fff]' />
    },
    {
        id: 4,
        link: "watchlists",
        name: "Watchlists",
        icon: <PiListStarFill className='text-[#fff]' />
    },
        {
        id: 5,
        link: "series",
        name: "Tv Series",
        icon: <RiMovieAiFill className='text-[#fff]' />
    },
        {
        id: 6,
        link: "downloads",
        name: "Downlaods",
        icon: <IoDownloadOutline className='text-[#fff]' />
    }
]