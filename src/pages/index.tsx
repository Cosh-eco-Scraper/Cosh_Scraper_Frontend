import Navbar from '../../components/NavBar';
import { useState } from 'react';
import ScraperPopup from '../../components/ScraperPopUp';
import router from 'next/router';
import StoreService from '../../service/StoreService';
import { useQuery } from '@tanstack/react-query';
import CoshButton from '../../components/CoshButton';

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeData'],
    queryFn: () => StoreService.getAllStores(),
  });
  
  return (
    <>
      <Navbar></Navbar>
      <main>
        {' '}
        <div className="flex min-h-screen items-center justify-center bg-white">
        <CoshButton onClick={() => setIsPopupOpen(true)}>
                        Register your store!
                    </CoshButton>

          {isPopupOpen && <ScraperPopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />}
        </div>
      </main>
    </>
  );
}
