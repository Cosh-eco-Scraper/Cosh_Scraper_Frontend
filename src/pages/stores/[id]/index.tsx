import React from 'react';
import useStore from '@/hooks/store/useStore';
import {useRouter} from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import OpeningHourInformation from '@/components/OpeningHourInformation';
import CoshButton from '@/components/CoshButton';
import Link from 'next/link';

export default function StoreOverview() {
    const router = useRouter();
    const {id} = router.query;
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

    return (
        <div className="flex flex-col bg-gray-50">
            <header className="bg-[#060023] py-8 text-white shadow-md">
                <div className="mx-auto max-w-5xl px-4 text-center">
                    <h1 className="mb-2 text-4xl font-extrabold">Store Overview</h1>
                    <h2 className="text-lg font-medium text-gray-200">
                        View your store information below
                    </h2>
                </div>
            </header>
            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="flex flex-col gap-6">
                        <section className="rounded-2xl bg-white p-6 shadow-md">
                            <div>
                                <Description
                                    isLoading={isLoadingStore}
                                    error={storeError}
                                    store={store}
                                    isError={isErrorStore}
                                    readOnly={true}
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
                    <div className="flex flex-col gap-6">
                        <section className="rounded-2xl bg-white p-6 shadow-md">
                            <LocationInformation
                                isLoading={isLoadingStore}
                                error={storeError}
                                isError={isErrorStore}
                                store={store}
                                readOnly={true}
                            />
                        </section>
                        <section className="rounded-2xl bg-white p-6 shadow-md">
                            <OpeningHourInformation
                                isLoading={isLoadingOpeningHours}
                                error={openingHoursError}
                                isError={isOpeningHoursError}
                                openingHours={openingHours}
                                readOnly={true}
                            />
                        </section>
                    </div>
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