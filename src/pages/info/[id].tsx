import React, {useState} from 'react';
import useStore from '@/hooks/store/useStore';
import {useRouter} from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import OpeningHourInformation from '@/components/OpeningHourInformation';

export default function Info() {
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

    // Centralized state for all form fields, initialized directly from 'store' or with empty strings
    const [formData, setFormData] = useState(() => ({
        name: store?.name ?? '',
        description: store?.description ?? '',
    }));

    const [locationFormData, setLocationFormData] = useState({
        street: store?.street ?? '',
        number: store?.number || '',
        postalCode: store?.postalCode || '',
        city: store?.city || '',
    });

    if (store && formData.name === '' && store.name !== '' && store.street !== '') {
        setFormData({
            name: store.name ?? '',
            description: store.description ?? '',
        });

        setLocationFormData({
            street: store.street ?? '',
            number: store.number || '',
            postalCode: store.postalCode || '',
            city: store.city || '',
        });
    }


    const handleLocationChange = (field: keyof typeof locationFormData, value: string) => {
        setLocationFormData(prev => ({...prev, [field]: value}));
    };

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
                                    isLoading={isLoadingStore}
                                    error={storeError}
                                    store={store}
                                    isError={isErrorStore}
                                    formData={{name: formData.name, description: formData.description}}
                                    onFieldChange={() => {
                                    }}
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
                                formData={locationFormData}
                                onFieldChange={handleLocationChange}
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

            </main>
        </div>
    );
}
