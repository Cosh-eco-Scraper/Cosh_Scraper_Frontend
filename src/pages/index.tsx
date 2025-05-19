import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '../../components/NavBar';
import { useState } from 'react';
import ScraperPopup from '../../components/ScraperPopUp';



export default function Home() {

const [isPopupOpen, setIsPopupOpen] = useState(false);
  

  return (
  <><Navbar></Navbar>
  <main> <div className="bg-white min-h-screen flex items-center justify-center"> 
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Open Popup
      </button>

      {isPopupOpen && (
        <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
    </div></main>
      </>
  );
}
