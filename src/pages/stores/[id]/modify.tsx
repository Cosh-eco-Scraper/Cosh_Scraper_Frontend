import React, { useEffect, useState } from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import BrandList from '@/components/BrandList';
import LocationInformation from '@/components/LocationInformation';
import EditOpeningHourInformation from '@/components/openinghours/EditOpeningHourInformation';
import useModifyLocation from '@/hooks/location/useModifyLocation';
import useModifyOpeningHours from '@/hooks/openinghours/useModifyOpeningHours';
import useModifyStore from '@/hooks/store/useModifyStore';
import CoshButton from '@/components/CoshButton';
import TypeList from '@/components/TypeList';
import { OpeningHour } from '@/domain/OpeningHour';
import useModifyBrands from '@/hooks/brands/useModifyBrands';
import useBrands from '@/hooks/brands/useBrands';
import useRemoveBrand from '@/hooks/brands/useDeleteBrands';
import { queryClient } from '@/config/queryClient';
import { Brand } from '@/domain/Brand';

export default function Info() {
  const router = useRouter();
  const { id } = router.query;
  const storeId = parseInt((id as string) ?? '0');

  const {
    openingHours,
    store,
    brands,
    types,
    storeError,
    isErrorBrands,
    isLoadingBrands,
    isErrorStore,
    isSuccessOpeningHours,
    isLoadingStore,
    isErrorTypes,
    typesError,
    isLoadingTypes,
    brandsError,
  } = useStore(storeId);

  const { allBrands } = useBrands();
  console.log('allBrands', allBrands);

  const { removeBrand, isSuccessRemoveBrand, isErrorRemoveBrand } = useRemoveBrand(storeId);

  const [formData, setFormData] = useState(() => ({
    name: '',
    description: '',
    retour: '',
  }));

  const [isModified, setModified] = useState(false);
  const { updateLocation, isSuccessUpdateLocation } = useModifyLocation(store?.locationId ?? 0);
  const { updateOpeningHours, isSuccessUpdateOpeningHours } = useModifyOpeningHours();
  const { updateStore, isSuccessUpdateStore } = useModifyStore(storeId);
  const { updateBrands, isSuccessUpdateBrands } = useModifyBrands(storeId);

  const [locationFormData, setLocationFormData] = useState({
    street: '',
    number: '',
    postalCode: '',
    city: '',
    country: '',
  });

  const [openingHoursFormData, setOpeningHoursFormData] = useState<OpeningHour[]>(
    openingHours ?? []
  );
  const [brandsFormData, setBrandsFormData] = useState<string[]>([]);
  const [selectedServerBrands, setSelectedServerBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (store && store.name !== '' && store.street !== '') {
      setFormData({
        name: store.name ?? '',
        description: store.description ?? '',
        retour: store.retour ?? '',
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
    if ( isSuccessOpeningHours && openingHours) {
      setOpeningHoursFormData(openingHours);
    }
  }, [isSuccessOpeningHours, openingHours]);

  useEffect(() => {
    if (brands) {
      setSelectedServerBrands(brands);
    }
  }, [brands]);

  useEffect(() => {
    if (!isModified) return;

    if (
      isSuccessUpdateLocation &&
      isSuccessUpdateOpeningHours &&
      isSuccessUpdateStore &&
      isSuccessUpdateBrands
    ) {
      router.push(`/stores/${storeId}`);
    }
  }, [
    isSuccessUpdateLocation,
    isSuccessUpdateOpeningHours,
    isSuccessUpdateStore,
    isSuccessUpdateBrands,
    isModified,
    router,
    storeId,
  ]);

  const handleLocationChange = (field: keyof typeof locationFormData, value: string) => {
    setLocationFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateHour = (id: number, hour: OpeningHour) => {
    setOpeningHoursFormData(prevArray => {
      const updatedArray = prevArray.map(item => (item.id === id ? hour : item));
      console.log('Inside setOpeningHoursFormData - previous array:', prevArray); // <-- ADD THIS
      console.log('Inside setOpeningHoursFormData - updated array:', updatedArray); // <-- ADD THIS
      return updatedArray;
    });
    console.log('openingHoursFormData:', openingHoursFormData);

    console.log('openingHoursFormData after update (might be stale):', openingHoursFormData);
  };

  function handleAddBrand(b: Brand) {
    setSelectedServerBrands(s => [...s, b]);
  }

  async function handleRemoveBrand(id: number) {
    try {
      await removeBrand(id);
      queryClient.invalidateQueries({
        queryKey: ['brands', storeId],
      });
      console.log('Removing brand is successful:', isSuccessRemoveBrand);
      setSelectedServerBrands(s => s.filter(b => b.id !== id));
    } catch (error) {
      console.error('Error removing brand:', isErrorRemoveBrand);
      console.error('Error removing brand message:', error);
    }
  }

  const updateStoreData = async () => {
    try {
      if (store) {
        await updateStore({
          name: formData.name,
          description: formData.description,
          retour: formData.retour,
        });

        await updateLocation({
          street: locationFormData.street,
          number: locationFormData.number,
          postalCode: locationFormData.postalCode,
          city: locationFormData.city,
          country: locationFormData.country,
        });

        if (openingHoursFormData && openingHoursFormData.length > 0) {
          await updateOpeningHours(
            openingHoursFormData.map(openingHour => {
              openingHour.storeId = storeId;
              return openingHour;
            })
          );
        }

        await updateBrands([
          ...selectedServerBrands.map(b => b.name),
          ...brandsFormData.filter(x => x.trim() !== ''),
        ]);

        setModified(true);
      }
    } catch (error) {
      console.error('Error updating store data:', error);
    }
  };

  const handleSubmit = async () => {
    await updateStoreData();
  };

  // Add at the top of the Info component's function body
  console.log('Info.tsx rendered');
  console.log('Info.tsx - openingHours from useStore:', openingHours);
  console.log('Info.tsx - openingHoursFormData state:', openingHoursFormData);

  return (
    <div className="flex flex-col bg-gray-50">
      {/*Header*/}
      <div className="bg-[#060023] py-8 text-white shadow-md">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-2 text-4xl font-extrabold">Your Company Info</h1>
          <h2 className="text-lg font-medium text-gray-200">
            Please verify if your store information is correct.
          </h2>
        </div>
      </div>
      <div className="max-w-12xl mx-auto w-full flex-1 px-6 py-10">
        {/*Disclaimer*/}
        <div>
          <p className="flex justify-center p-2 text-black">
            Disclaimer: Please fill out all information on this page in English.
          </p>
        </div>
        {/*Disclaimer*/}
        <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2">
          <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
            <Description
              isLoading={isLoadingStore}
              error={storeError}
              store={store}
              isError={isErrorStore}
              formData={{
                name: formData.name,
                description: formData.description,
                retour: formData.retour,
              }}
              onFieldChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
            />
            <BrandList
              isLoading={isLoadingBrands}
              error={brandsError}
              isError={isErrorBrands}
              brands={selectedServerBrands}
              allBrands={allBrands}
              customBrands={brandsFormData}
              onCustomBrandsChange={setBrandsFormData}
              onAddBrand={handleAddBrand}
              onRemoveBrand={handleRemoveBrand}
              readOnly={false}
            />
          </section>
          <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
            <TypeList
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
              formData={locationFormData}
              onFieldChange={handleLocationChange}
            />
            <EditOpeningHourInformation
              openingHours={openingHoursFormData}
              updateHour={updateHour}
              isLoading={false}
              error={null}
              isError={false}
            />
          </section>
        </div>
        <div className="flex justify-center p-2">
          <CoshButton onClick={handleSubmit}>Submit data</CoshButton>
        </div>
      </div>
    </div>
  );
}
