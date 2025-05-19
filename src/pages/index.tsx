import Navbar from '../../components/NavBar';
import { useState } from 'react';
import ScraperPopup from '../../components/ScraperPopUp';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Navbar></Navbar>
      <main>
        {' '}
        <div className="flex min-h-screen items-center justify-center bg-white">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="rounded bg-green-500 px-4 py-2 text-white"
          >
            Open Popup
          </button>

          {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
        </div>
      </main>
    </>
  );
}
