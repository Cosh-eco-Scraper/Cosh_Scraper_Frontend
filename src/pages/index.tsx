import { useState } from 'react';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#060026]">
      <div className="relative z-20 flex w-full max-w-6xl flex-col items-center pt-16 pb-64">
        <div className="flex w-full flex-row items-center justify-center">
          <div className="flex flex-1 justify-center">
            <div className="flex h-[180px] w-[320px] items-center justify-center rounded-md bg-[#E5E5E5]">
              <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="8" fill="#D1D5DB" />
                <path
                  d="M20 44l12-16 12 16"
                  stroke="#A3A3A3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="24" cy="28" r="4" fill="#A3A3A3" />
              </svg>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="mb-6 text-center text-3xl font-bold text-[583AFF] md:text-4xl">
              Want your shop on our site?
            </h1>
            <CoshButton onClick={() => setIsPopupOpen(true)}>Join us</CoshButton>
            {isPopupOpen && (
              <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
            )}
          </div>
        </div>
        <div className="absolute -bottom-40 left-[15%] z-30 flex w-full max-w-4xl -translate-x-1/6 flex-row gap-32 px-4">
          <div className="min-w-[260px] flex-1 rounded-lg bg-white p-6 text-sm text-gray-800 shadow-md">
            COSH.eco is your ultimate destination for sustainable and ethical fashion discovery. We
            connect conscious consumers with eco-friendly retailers, making sustainable shopping
            easier than ever before.
            <br />
            <br />
            Our platform provides detailed insights into stores' sustainability practices, ethical
            certifications, and brand transparency. We help you make informed decisions about your
            fashion choices while supporting businesses that care about our planet.
          </div>
          <div className="min-w-[260px] flex-1 rounded-lg bg-white p-6 text-sm text-gray-800 shadow-md">
            Join our growing community of responsible retailers and conscious consumers who are
            making a positive impact on the fashion industry, one purchase at a time.
          </div>
        </div>
      </div>
      <div className="z-10 w-full flex-1 bg-white" style={{ minHeight: '40vh' }}></div>
    </div>
  );
}
