import React, { useEffect, useState } from 'react';
import useStore from '@/hooks/store/useStore';
import { useRouter } from 'next/router';
import Description from '@/components/Description';
import EditBrandList from '@/components/brands/EditBrandList';
import LocationInformation from '@/components/LocationInformation';
import EditOpeningHourInformation from '@/components/openinghours/EditOpeningHourInformation';
import useModifyLocation from '@/hooks/location/useModifyLocation';
import useModifyOpeningHours from '@/hooks/openinghours/useModifyOpeningHours';
import useModifyStore from '@/hooks/store/useModifyStore';
import CoshButton from '@/components/CoshButton';
import EditTypeList from '@/components/types/EditTypeList';
import { OpeningHour } from '@/domain/OpeningHour';
import Head from 'next/head';
import { Type } from '@/domain/StoreType';
import useModifyStoreTypes from '@/hooks/storeType/useModifyStoreTypes';
import useModifyBrands from '@/hooks/brands/useModifyBrands';
import { Brand } from '@/domain/Brand';

export default function Info() {
  const router = useRouter();
  const { id } = router.query;
  const storeId = parseInt((id as string) ?? '0');
  const { addStoreType, removeStoreType } = useModifyStoreTypes();

  const {
    openingHours,
    store,
    brands,
    isSuccessBrands,
    types,
    storeError,
    isErrorStore,
    isSuccessOpeningHours,
    isLoadingStore,
    isLoadingTypes,
    isSuccessTypes,
  } = useStore(storeId);

  const [formData, setFormData] = useState(() => ({
    name: '',
    description: '',
    retour: '',
  }));

  const [isModified, setModified] = useState(false);
  const { updateLocation, isSuccessUpdateLocation } = useModifyLocation(store?.locationId ?? 0);
  const { updateOpeningHours, isSuccessUpdateOpeningHours } = useModifyOpeningHours();
  const { updateStore, isSuccessUpdateStore } = useModifyStore(storeId);
  const { updateBrands, isSuccessUpdateBrands, removeBrand } =
    useModifyBrands(storeId);

  const [locationFormData, setLocationFormData] = useState({
    street: '',
    number: '',
    postalCode: '',
    city: '',
    country: '',
  });

  //region openingshours latest update
  const [openingHoursFormData, setOpeningHoursFormData] = useState<OpeningHour[]>(
    openingHours ?? []
  );

  useEffect(() => {
    if (isSuccessOpeningHours && openingHours) {
      console.log('openingHours:', openingHours);
      setOpeningHoursFormData(openingHours);
    }
  }, [isSuccessOpeningHours, openingHours]);

  //endregion
  //region types
  const [typesFormData, setTypesFormData] = useState<Type[]>(types ?? []);

  const [originalTypes, setOriginalTypes] = useState<Type[]>(types ?? []);

  useEffect(() => {
    if (types && isSuccessTypes) {
      setTypesFormData(types);
      setOriginalTypes(types);
    }
  }, [types, isSuccessTypes]);

  const addType = (type: Type) => {
    setTypesFormData(prev => [...prev.filter(t => t.id !== type.id), type]);
  };

  const removeType = (id: number) => {
    setTypesFormData(prev => prev.filter(t => t.id !== id));
  };

  //endregion

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
    if (isSuccessOpeningHours && openingHours) {
      setOpeningHoursFormData(openingHours);
    }
  }, [isSuccessOpeningHours, openingHours]);

  const [originalBrands, setOriginalBrands] = useState<Brand[]>([]);
  const [brandsFormData, setBrandsFormData] = useState<Brand[]>([]);

  useEffect(() => {
    if (isSuccessBrands && brands) {
      setOriginalBrands(brands);
      setBrandsFormData(brands);
    }
  }, [brands, isSuccessBrands]);

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
    setBrandsFormData(prev => [...prev.filter(x => x.name !== b.name), b]);
  }

  async function handleRemoveBrand(id: number) {
    setBrandsFormData(prev => prev.filter(x => x.id !== id));
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

        // Compare brands to find changes
        const addedBrands = brandsFormData.filter(
          brand => !originalBrands.some(originalBrand => originalBrand.id === brand.id)
        );
        const removedBrands = originalBrands.filter(
          brand => !brandsFormData.some(currentBrand => currentBrand.id === brand.id)
        );

        // Update store brands
        if (addedBrands.length > 0) {
          await updateBrands(addedBrands.map(brand => brand.name));
        }

        for (const brand of removedBrands) {
          await removeBrand(brand.id);
        }

        // Compare types to find changes
        const addedTypes = typesFormData.filter(
          type => !originalTypes.some(originalType => originalType.id === type.id)
        );
        const removedTypes = originalTypes.filter(
          type => !typesFormData.some(currentType => currentType.id === type.id)
        );

        // Update store types
        for (const type of addedTypes) {
          const storeType = { storeId, typeId: type.id };

          await addStoreType(storeType);
        }
        for (const type of removedTypes) {
          const storeType = { storeId, typeId: type.id };
          await removeStoreType(storeType);
        }

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
    <>
      <Head>
        <title>{store?.name ? `${store.name} | Cosh` : 'Store | Cosh'}</title>
        <meta
          name="description"
          content={
            formData.description?.slice(0, 155) ||
            store?.description?.slice(0, 155) ||
            'Edit your sustainable shop information on Cosh.'
          }
        />
        <meta property="og:title" content={store?.name || 'Store | Cosh'} />
        <meta
          property="og:description"
          content={
            formData.description?.slice(0, 200) ||
            store?.description?.slice(0, 200) ||
            'Edit your sustainable shop information on Cosh.'
          }
        />
      </Head>
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
              <EditBrandList
                brands={brandsFormData}
                onAddBrand={handleAddBrand}
                onRemoveBrand={handleRemoveBrand}
              />
            </section>
            <section className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
              <EditTypeList
                isLoading={isLoadingTypes}
                types={typesFormData}
                addType={addType}
                removeType={removeType}
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
    </>
  );
}
