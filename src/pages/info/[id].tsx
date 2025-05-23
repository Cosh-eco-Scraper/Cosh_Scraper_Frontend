import React, { JSX, useState } from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import OpeningHourInformation from '@/components/OpeningHourInformation';
import CoshButton from '@/components/CoshButton';
import { useUpdateStoreMutation } from '@/hooks/store/useStoreMutation';

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

  const updateStoreMutation = useUpdateStoreMutation();

  const handleConfirm = () => {
    if (!store?.id) {
      console.error('No store ID available');
      return;
    }

    updateStoreMutation.mutate(
      {
        id: store.id,
        ...formData,
      },
      {
        onSuccess: () => {
          console.log('Store information confirmed and saved');
          // router.push('/next-step');
        },
        onError: error => {
          console.error('Failed to confirm store information:', error);
        },
      }
    );
  };

  const updateFormField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field: keyof typeof locationFormData, value: string) => {
    setLocationFormData(prev => ({ ...prev, [field]: value }));
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
                  formData={{ name: formData.name, description: formData.description }}
                  onFieldChange={updateFormField}
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
        <section className="mt-8 flex justify-center">
          <CoshButton onClick={handleConfirm}>
            {updateStoreMutation.isPending ? 'Saving...' : 'Confirm'}
          </CoshButton>
        </section>

        {/* Show mutation status */}
        {updateStoreMutation.isError && (
          <div className="mt-4 text-center text-red-600">Failed to save store information</div>
        )}

        {updateStoreMutation.isSuccess && (
          <div className="mt-4 text-center text-green-600">
            Store information saved successfully!
          </div>
        )}
      </main>
    </div>
  );
}
