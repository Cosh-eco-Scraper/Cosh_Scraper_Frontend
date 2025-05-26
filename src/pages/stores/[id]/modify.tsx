import React, { useState, useEffect } from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import OpeningHourInformation from '@/components/OpeningHourInformation';
import useModifyLocation from '@/hooks/location/useModifyLocation';
import useModifyOpeningHours from '@/hooks/openinghours/useModifyOpeningHours';
import useModifyStore from '@/hooks/store/useModifyStore';
import CoshButton from '@/components/CoshButton';
import { OpeningHour } from '@/domain/OpeningHour';

export default function Info() {
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

  const [formData, setFormData] = useState(() => ({
    name: '',
    description: '',
  }));

  const [isModified, setModified] = useState(false);
  const { updateLocation, isSuccessUpdateLocation } = useModifyLocation(store?.locationId ?? 0);
  const { updateOpeningHours, isSuccessUpdateOpeningHours } = useModifyOpeningHours();
  const { updateStore, isSuccessUpdateStore } = useModifyStore(storeId);
  const [error, setError] = useState<string | null>(null);

  const [locationFormData, setLocationFormData] = useState({
    street: '',
    number: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const [openingHoursFormData, setOpeningHoursFormData] = useState<OpeningHour[]>([]);

  useEffect(() => {
    if (store && store.name !== '' && store.street !== '') {
      setFormData({
        name: store.name ?? '',
        description: store.description ?? '',
      });

      setLocationFormData({
        street: store.street ?? '',
        number: store.number || '',
        postalCode: store.postalCode || '',
        city: store.city || '',
        country: store.country || '',
      });
    }
  }, [store]);

  useEffect(() => {
    if (openingHours) {
      setOpeningHoursFormData(openingHours);
    }
  }, [openingHours]);

  useEffect(() => {
    if (!isModified) return;

    if (isSuccessUpdateLocation && isSuccessUpdateOpeningHours && isSuccessUpdateStore) {
      router.push(`/stores/${storeId}`);
    }
  }, [isSuccessUpdateLocation, isSuccessUpdateOpeningHours, isSuccessUpdateStore, isModified]);

  const handleLocationChange = (field: keyof typeof locationFormData, value: string) => {
    setLocationFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateStoreData = async () => {
    try {
      if (store) {
        // Validate required fields
        if (!formData.name || !formData.description) {
          console.error('Missing required store fields:', formData);
          setError('Store name and description are required.');
        }

        if (
          !locationFormData.street ||
          !locationFormData.number ||
          !locationFormData.postalCode ||
          !locationFormData.city ||
          !locationFormData.country
        ) {
          console.error('Missing required location fields:', locationFormData);
          setError('All location fields are required.');
        }

        // Update store information
        await updateStore({
          name: formData.name,
          description: formData.description,
        });

        // Update location information
        await updateLocation({
          street: locationFormData.street,
          number: locationFormData.number,
          postalCode: locationFormData.postalCode,
          city: locationFormData.city,
          country: locationFormData.country,
        });

        // Update opening hours if modified
        if (openingHoursFormData && openingHoursFormData.length > 0) {
          await updateOpeningHours(openingHoursFormData);
        }

        setModified(true);
      }
    } catch (error) {
      console.error('Error updating store data:', error);
    }
  };

  const handleSubmit = async () => {
    updateStoreData();
  };

  const updateOpeningHour = (openingHour: OpeningHour) => {
    const updatedHours = openingHoursFormData.map(hour =>
      hour.id === openingHour.id ? { ...openingHour, storeId: storeId } : hour
    );

    setOpeningHoursFormData(updatedHours);
  };

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
          <div className="flex flex-col gap-6">
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <div>
                <Description
                  isLoading={isLoadingStore}
                  error={storeError}
                  store={store}
                  isError={isErrorStore}
                  formData={{ name: formData.name, description: formData.description }}
                  onFieldChange={() => {}}
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
                formData={locationFormData}
                onFieldChange={handleLocationChange}
              />
            </section>
            <section className="rounded-2xl bg-white p-6 shadow-md">
              <OpeningHourInformation
                isLoading={isLoadingOpeningHours}
                error={openingHoursError}
                isError={isOpeningHoursError}
                updateHour={updateOpeningHour}
                openingHours={openingHoursFormData}
              />
            </section>
          </div>
        </div>
        <div className="flex justify-center p-2">
          <CoshButton onClick={handleSubmit}>Submit data</CoshButton>
        </div>

        {error && (
          <div className="mt-4 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </main>
    </div>
  );
}
