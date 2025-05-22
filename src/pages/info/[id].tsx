import React, { JSX } from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import OpeningHourInformation from '@/components/OpeningHourInformation';
import CoshButton from '@/components/CoshButton';

export default function Info(): JSX.Element | null {
  const router = useRouter();
  const { id } = router.query;
  const storeId = parseInt((id as string) ?? '0');

  const {
    openingHours,
    store,
    brands,
    storeError,
    isErrorBrands,
    isLoadingBrands,
    isErrorStore,
    isLoadingOpeningHours,
    isLoadingStore,
    isOpeningHoursError,
    brandsError,
    openingHoursError,
  } = useStore(storeId);

  console.log(openingHours, store, brands);

  return (
    <div className="flex flex-col bg-gray-50">
      <header className="bg-[#060023] py-8 text-white shadow-md">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-2 text-4xl font-extrabold">Your Company Info</h1>
          <h2 className="text-lg font-medium text-gray-200">
            Please verify if your store information is correct.
          </h2>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <div>
                <Description
                  isLoading={false}
                  error={storeError}
                  store={store}
                  isError={isErrorStore}
                />
              </div>

              <div>
                <BrandList
                  isLoading={isLoadingBrands}
                  error={brandsError}
                  isError={isErrorBrands}
                  brands={brands}
                />
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <LocationInformation
                isLoading={isLoadingStore}
                error={storeError}
                isError={isErrorStore}
                store={store}
              />
            </section>
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <OpeningHourInformation
                isLoading={isLoadingOpeningHours}
                error={openingHoursError}
                isError={isOpeningHoursError}
                openingHours={openingHours}
              />
            </section>
          </div>
        </div>


        <section  className='mt-8 flex justify-center'>
                    <CoshButton onClick={undefined}>Confirm</CoshButton>
            
          </section>
      </main>
    </div>
  );
}
