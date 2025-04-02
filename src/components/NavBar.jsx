import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Import icons for hamburger menu

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the mobile menu

    return (
        <nav className="bg-blue-400 text-neutral-content py-4 fixed w-full z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold">Chat-Simulator</Link>

                {/* Hamburger Menu (Mobile View) */}
                <button 
                    className="lg:hidden text-2xl" 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <HiX /> : <HiOutlineMenu />}
                </button>

                {/* Navbar Links (Desktop) */}
                <ul className="hidden lg:flex space-x-6">
                    {/* <li><Link to="/" className="hover:text-blue-200 text-2xl">Home</Link></li> */}
                    {/* <li><Link to="#faq" className="hover:text-blue-200 text-2xl">FAQ</Link></li> */}
                    <li><Link to="/login" className="hover:text-blue-200 text-2xl">Login</Link></li>
                </ul>
            </div>

            {/* Mobile Menu (Collapsible) */}
            {isOpen && (
                <div className="lg:hidden bg-neutral text-center py-4">
                    <ul className="space-y-4">
                        {/* <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li> */}
                        {/* <li><Link to="#faq" onClick={() => setIsOpen(false)}>FAQ</Link></li> */}
                        <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
