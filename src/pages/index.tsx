import { useState } from 'react';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Purple section */}
      <div className="relative bg-[#060026] pb-32">
        <div className="relative z-20 flex w-full max-w-6xl mx-auto flex-col items-center pt-16">
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
              <h1 className="mb-6 text-center text-3xl font-bold text-[#583AFF] md:text-4xl">
                Welcome to COSH!
              </h1>
              <p className="mt-4 mb-3 max-w-2xl text-lg text-[#FBF6F0]">
                COSH! is your ultimate destination for sustainable and ethical fashion discovery. We
                connect conscious consumers with eco-friendly retailers, making sustainable shopping
                easier than ever before.
              </p>
              <p className="mb-6 max-w-2xl text-lg text-[#FBF6F0]">
                Join our growing community of responsible retailers and conscious consumers who are
                making a positive impact on the fashion industry, one purchase at a time.
              </p>
              <CoshButton onClick={() => setIsPopupOpen(true)}>Register your store now!</CoshButton>
            </div>
          </div>
        </div>
      </div>

      {/* White section */}
      <div className="relative bg-white pt-32 pb-16 flex-1">
        {/* Overlapping cards positioned between purple and white sections */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-30 flex w-full max-w-4xl flex-row gap-8 px-4">
          <div className="flex-1 rounded-lg bg-white p-6 text-sm text-gray-800 shadow-lg border border-gray-100">
            As a retailer, it can be challenging to communicate your sustainable actions in a
            reliable and balanced way.
            <br />
            <br />
            Our platform provides detailed insights into stores' sustainability practices,
            ethical certifications, and brand transparency.
          </div>
          <div className="flex-1 rounded-lg bg-white p-6 text-sm text-gray-800 shadow-lg border border-gray-100">
            Join our growing community of responsible retailers and conscious consumers who are
            making a positive impact on the fashion industry, one purchase at a time.
            <br />
            <br />
            We help you make informed decisions about your fashion choices while supporting
            businesses that care about our planet.
          </div>
        </div>

        {/* Placeholder for additional content */}
        <div className="pt-20">{/* Add any extra content here */}</div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-30">
          <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </div>
  );
}
