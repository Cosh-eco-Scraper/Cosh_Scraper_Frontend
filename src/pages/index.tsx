import { useState } from 'react';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#060026] flex flex-col items-center">
      <div className="relative w-full flex flex-col items-center pt-16 pb-64 max-w-6xl z-20">
        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex-1 flex justify-center">
            <div className="w-[320px] h-[180px] bg-[#E5E5E5] rounded-md flex items-center justify-center">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="8" fill="#D1D5DB" />
                <path d="M20 44l12-16 12 16" stroke="#A3A3A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="24" cy="28" r="4" fill="#A3A3A3" />
              </svg>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[583AFF] text-center mb-6">Want your shop on our site?</h1>
            <CoshButton onClick={() => setIsPopupOpen(true)}>
              Join us
            </CoshButton>
            {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
          </div>
        </div>
        <div className="absolute left-[15%] -translate-x-1/6 -bottom-40 flex flex-row gap-32 w-full max-w-4xl px-4 z-30">
          <div className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[260px] text-sm text-gray-800">
            COSH.eco is your ultimate destination for sustainable and ethical fashion discovery. We connect conscious consumers with eco-friendly retailers, making sustainable shopping easier than ever before.<br /><br />Our platform provides detailed insights into stores' sustainability practices, ethical certifications, and brand transparency. We help you make informed decisions about your fashion choices while supporting businesses that care about our planet.
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex-1 min-w-[260px] text-sm text-gray-800">
            Join our growing community of responsible retailers and conscious consumers who are making a positive impact on the fashion industry, one purchase at a time.
          </div>
        </div>
      </div>
      <div className="w-full flex-1 bg-white z-10" style={{ minHeight: '40vh' }}></div>
    </div>
  );
}
