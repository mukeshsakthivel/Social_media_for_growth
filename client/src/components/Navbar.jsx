import ProfileIcon from '../assets/defaultProfile.png'
import Logo from '../assets/logo.webp';
import ProfileDropdown from './ProfileDropdown';
import { CiSearch } from "react-icons/ci";
import { WiTime4 } from "react-icons/wi";
import { TiHome } from "react-icons/ti";
import { IoPeopleSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoNotifications } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
    const searchRef = useRef(null);
    const popularSearches = ['React.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'MongoDB'];
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const profileRef = useRef(null);

    const fetchData = (value) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                const results = json.filter((user) => {
                    return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase());
                });
                setResults(results);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    const storeSearchTerm = (value) => {
        if (!value) return;

        const updatedSearches = [value, ...recentSearches.filter(item => item !== value)].slice(0, 3);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

        setInput('');
        setIsSearchActive(false);
        setIsMobileSearchActive(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            storeSearchTerm(input);
        }
    };

    const handleResultClick = (value) => {
        storeSearchTerm(value);
    };

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleFocus = () => {
        setIsSearchActive(true);
    };

    const handleMobileSearchToggle = () => {
        setIsMobileSearchActive(true);
        setIsSearchActive(true);
    };

    const handleClickOutside = (e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setIsSearchActive(false);
            setIsMobileSearchActive(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const closeDropdown = (e) => {
        if (profileRef.current && !profileRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isSearchActive) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSearchActive]);

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', closeDropdown);
        } else {
            document.removeEventListener('click', closeDropdown);
        }

        return () => document.removeEventListener('click', closeDropdown);
    }, [isDropdownOpen]);

    const { pathname } = useLocation();
    const subPage = pathname.split('/')?.[1] || 'home';

    const getLinkClasses = (type) => {
        const isActive = subPage === type;
        let linkClasses = 'cursor-pointer flex flex-col items-center text-iconGray text-sm hover:text-black';

        if (isActive) {
            linkClasses += ' border-b-2 border-black text-black';
        }

        return { linkClasses, isActive };
    };

    return (
        <>
            {isSearchActive && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            )}

            <div className="sticky top-0 bg-white flex justify-between z-20" style={{ height: '3.8rem' }}>
                <div className={`flex ${isMobileSearchActive ? 'w-full' : ''}`} ref={searchRef}>
                    {!isMobileSearchActive && <img src={Logo} alt="" className='h-12 mt-1 moveIcon:ml-icon' />}
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search"
                            value={input}
                            onFocus={handleFocus}
                            onChange={(e) => handleChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={`border border-none rounded-md p-2 w-full h-10 search outline-none pl-8 mb-2 mt-3 ${isMobileSearchActive ? 'block' : 'hidden navSearch:block'}`}
                        />
                        <CiSearch
                            className={`text-lg absolute ${isMobileSearchActive ? 'hidden' : 'block'}`}
                            style={{ left: '0.6rem', top: '1.4rem' }}
                            onClick={handleMobileSearchToggle}
                        />
                        {isSearchActive && (
                            <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-1 shadow-lg z-30">
                                {input && results.length > 0 ? (
                                    results.map((result, id) => (
                                        <div key={id} className='flex ml-2 pt-2 pb-2'>
                                            <CiSearch className='mr-2' />
                                            <div
                                                onClick={() => handleResultClick(result.name)}
                                                className="cursor-pointer"
                                                style={{ marginTop: '-5px'}}
                                            >
                                                {result.name}
                                            </div>
                                        </div>
                                    ))
                                ) : recentSearches.length > 0 ? (
                                    <>
                                        <div className="p-2 font-bold text-sm">Recent</div>
                                        {recentSearches.map((item, index) => (
                                            <div key={index} className='flex ml-2 pt-2 pb-2'>
                                                <WiTime4 className='mr-2' />
                                                <div
                                                    onClick={() => handleResultClick(item)}
                                                    className="cursor-pointer"
                                                    style={{ marginTop: '-5px'}}
                                                >
                                                    {item}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="p-2 font-bold text-sm">Try popular searches</div>
                                        {popularSearches.map((item, index) => (
                                            <div key={index} className='flex ml-2 pt-2 pb-2'>
                                                <CiSearch className='mr-2' />
                                                <div
                                                    onClick={() => handleResultClick(item)}
                                                    className="cursor-pointer"
                                                    style={{ marginTop: '-5px'}}
                                                >
                                                    {item}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <div className="p-2 text-gray-500">No recent searches</div>
                                        <div className="p-2 font-bold text-sm">Try popular searches</div>
                                        {popularSearches.map((item, index) => (
                                            <div key={index} className='flex ml-2 pt-2 pb-2'>
                                                <CiSearch className='mr-2' />
                                                <div
                                                    onClick={() => handleResultClick(item)}
                                                    className="cursor-pointer"
                                                    style={{ marginTop: '-5px'}}
                                                >
                                                    {item}
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className={`flex gap-8 removeName:gap-10 navSearch:mr-20 mr-10 ${isMobileSearchActive ? 'hidden' : ''}`}>
                    <Link to='/home' className={getLinkClasses('home').linkClasses}>
                        <TiHome className={`text-2xl mt-5 removeName:mt-3 ${getLinkClasses('home').isActive ? 'text-black' : 'hover:text-black'} ${isMobileSearchActive ? 'block' : ''}`} />
                        <span className={`${getLinkClasses('home').isActive ? 'text-black' : 'hover:text-black'} hidden removeName:block`}>Home</span>
                    </Link>
                    <Link to='/connection' className={getLinkClasses('connection').linkClasses}>
                        <IoPeopleSharp className={`text-2xl mt-5 removeName:mt-3 ${getLinkClasses('connection').isActive ? 'text-black' : 'hover:text-black'}`} />
                        <span className={`${getLinkClasses('connection').isActive ? 'text-black' : 'hover:text-black'} hidden removeName:block`}>My Network</span>
                    </Link>
                    <Link to='/message' className={getLinkClasses('message').linkClasses}>
                        <AiFillMessage className={`text-xl mt-5 removeName:mt-4 ${getLinkClasses('message').isActive ? 'text-black' : 'hover:text-black'}`} />
                        <span className={`${getLinkClasses('message').isActive ? 'text-black' : 'hover:text-black'} hidden removeName:block`}>Messaging</span>
                    </Link>
                    <Link to='/notification' className={getLinkClasses('notification').linkClasses}>
                        <IoNotifications className={`text-xl mt-5 removeName:mt-4 ${getLinkClasses('notification').isActive ? 'text-black' : 'hover:text-black'}`} />
                        <span className={`${getLinkClasses('notification').isActive ? 'text-black' : 'hover:text-black'} hidden removeName:block`}>Notifications</span>
                    </Link>
                    <div className={getLinkClasses('profile').linkClasses}>
                        <div ref={profileRef} className="relative">
                            <img
                                src={ProfileIcon}
                                className={`w-6 mt-5 removeName:mt-3 removeName:ml-1 ${getLinkClasses('profile').isActive ? 'text-black' : 'hover:text-black'}`}
                                onClick={toggleDropdown}
                            />
                            <span className={`${getLinkClasses('profile').isActive ? 'text-black' : 'hover:text-black'} hidden removeName:flex-row removeName:flex`} onClick={toggleDropdown} >
                                Me<MdArrowDropDown className='mt-down' />
                            </span>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-5 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                    <ProfileDropdown closeDropdown={toggleDropdown} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;