import { useState } from 'react';
import Head from 'next/head';
import ScraperPopup from '@/components/ScraperPopUp';
import CoshButton from '@/components/CoshButton';


export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Head>
        <title>COSH! | Sustainable Fashion Discovery</title>
        <meta name="description" content="COSH! is your destination for sustainable and ethical fashion. Discover eco-friendly retailers, learn about sustainability practices, and join a community making a positive impact." />
        <meta property="og:title" content="COSH! | Sustainable Fashion Discovery" />
        <meta property="og:description" content="Connect with eco-friendly retailers and discover sustainable fashion on COSH!" />
        <meta property="og:type" content="website" />
      </Head>
      <div className="flex-1 bg-[#060026]">
        <div className={'flex min-w-[100%] flex-col items-center pt-7'}>
          <h1 className="text-4xl inter-medium text-[#FBF6F0]">Welcome to COSH!</h1>
          <p className="mt-4 mb-3 source-serif-pro-normal max-w-2xl col text-[#FBF6F0]">
            COSH.eco is your ultimate destination for sustainable and ethical fashion discovery. We
            connect conscious consumers with eco-friendly retailers, making sustainable shopping
            easier than ever before.
          </p>
          <p className="mb-3 max-w-2xl source-serif-pro-normal text-[#FBF6F0]">
            Our platform provides detailed insights into stores&apos; sustainability practices,
            ethical certifications, and brand transparency. We help you make informed decisions about
            your fashion choices while supporting businesses that care about our planet.
          </p>
          <p className="mb-6 max-w-2xl source-serif-pro-normal text-[#FBF6F0]">
            Join our growing community of responsible retailers and conscious consumers who are making
            a positive impact on the fashion industry, one purchase at a time.
          </p>
          <CoshButton onClick={() => setIsPopupOpen(true)}>Register your store now!</CoshButton>
          {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
        </div>
        {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
      </div>
    </>
  );
}