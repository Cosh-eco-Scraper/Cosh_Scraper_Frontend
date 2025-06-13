import React from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import CoshButton from '@/components/CoshButton';
import Link from 'next/link';
import EditTypeList from '@/components/types/EditTypeList';
import OpeningHourInformation from '@/components/openinghours/OpeningHourInformation';

export default function StoreOverview() {
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
    isLoadingStore,
    brandsError,
    types,
    isLoadingTypes,
    isErrorTypes,
    typesError,
  } = useStore(storeId);

  return (
    <div className="flex flex-col bg-gray-50">
      <header className="bg-[#060023] py-8 text-white shadow-md">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-2 text-4xl font-extrabold">Store Overview</h1>
          <h2 className="text-lg font-medium text-gray-200">View your store information below</h2>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="grid grid-cols-1 gap-6 pb-12 md:grid-cols-2">
          {/* Left column: one card containing Description and BrandList */}
          <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
            <Description
              isLoading={isLoadingStore}
              error={storeError}
              store={store}
              isError={isErrorStore}
              readOnly={true}
            />
            <BrandList
              isLoading={isLoadingBrands}
              error={brandsError}
              isError={isErrorBrands}
              brands={brands}
            />
          </section>
          {/* Right column: one card containing LocationInformation and EditOpeningHourInformation */}
          <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
            <EditTypeList
              types={types}
              isLoading={isLoadingTypes}
              isError={isErrorTypes}
              error={typesError}
            />
            <LocationInformation
              isLoading={isLoadingStore}
              error={storeError}
              isError={isErrorStore}
              store={store}
              readOnly={true}
            />
            <OpeningHourInformation openingHours={openingHours}></OpeningHourInformation>
          </section>
        </div>
        <div className="flex justify-center p-2">
          <Link href={`/stores/${storeId}/modify`}>
            <CoshButton>Modify Store</CoshButton>
          </Link>
        </div>
      </main>
    </div>
  );
}
