import { useState } from 'react';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="m-2 flex-1 bg-[#060026]">
      <div className={'m-2 flex min-w-[100%] flex-col items-center pt-7'}>
        <h1 className="text-4xl font-bold text-[#FBF6F0]">Welcome to COSH!</h1>
        <p className="mt-4 mb-3 max-w-2xl text-lg text-[#FBF6F0]">
          COSH.eco is your ultimate destination for sustainable and ethical fashion discovery. We
          connect conscious consumers with eco-friendly retailers, making sustainable shopping
          easier than ever before.
        </p>
        <p className="mb-3 max-w-2xl text-lg text-[#FBF6F0]">
          Our platform provides detailed insights into stores&apos; sustainability practices,
          ethical certifications, and brand transparency. We help you make informed decisions about
          your fashion choices while supporting businesses that care about our planet.
        </p>
        <p className="mb-6 max-w-2xl text-lg text-[#FBF6F0]">
          Join our growing community of responsible retailers and conscious consumers who are making
          a positive impact on the fashion industry, one purchase at a time.
        </p>
        <CoshButton onClick={() => setIsPopupOpen(true)}>Register your store now!</CoshButton>
        {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
      </div>
    </div>
  );
}
