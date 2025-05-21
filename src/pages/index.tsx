import Navbar from '@/components/NavBar';
import { useState } from 'react';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <div className="flex min-h-screen items-center justify-center bg-white">
          <CoshButton onClick={() => setIsPopupOpen(true)}>Register your store!</CoshButton>

          {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
        </div>
      </main>
    </>
  );
}
