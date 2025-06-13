import React from 'react';
import router from 'next/router';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#060023] text-white">
      <div className="flex items-center justify-between border-b border-[#1A1033] px-6 py-2 text-sm">
        <div className="flex items-center gap-4">
          <div className="group relative">
            <button className="hover:underline">English ▾</button>
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:underline">
            Download the COSH! app
          </a>
          <a href="#" className="hover:underline">
            COSH! for stores
          </a>
          <a href="#" className="hover:underline">
            COSH! for cities
          </a>
          <a href="#" className="hover:underline">
            About us
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
          <a href="#" className="font-semibold hover:underline">
            Login
          </a>
          <a href="#" className="font-semibold hover:underline">
            Register
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="text-3xl font-extrabold tracking-widest" onClick={() => router.push('/')}>
            COSH!
          </div>
          <a href="#" className="hover:underline">
            Cities
          </a>
          <a href="#" className="hover:underline">
            Green Fashion Tours
          </a>
          <a href="#" className="hover:underline">
            Stores
          </a>
          <a href="#" className="hover:underline">
            Brands
          </a>
          <a href="#" className="hover:underline">
            Jewellery
          </a>
          <a href="#" className="hover:underline">
            Magazine
          </a>
          <a href="#" className="hover:underline">
            Events
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <span>Search</span>
          </div>
          <button className="rounded-full bg-[#583AFF] px-4 py-2 font-medium text-white transition hover:bg-[#8B75FF]">
            Discover stores →
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
