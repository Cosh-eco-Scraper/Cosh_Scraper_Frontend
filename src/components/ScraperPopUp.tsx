import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useModifyStores from '@/hooks/store/useMofifyStores';
import { CreateStore } from '@/domain/Store';

interface MyPopupProps {
  open: boolean;
  onClose: () => void;
}

const ScraperPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<CreateStore>();
  const { createStore, isPendingCreateStore, isSuccessCreateStore, storeResponse } =
    useModifyStores();

  const onSubmit = async (data: CreateStore) => {
    try {
      await createStore(data);
    } catch {
      console.error('create store failed');
    }
  };
  useEffect(() => {
    if (isPendingCreateStore) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    console.log('Success:', isSuccessCreateStore, 'Response:', storeResponse);

    if (isSuccessCreateStore && storeResponse?.id) {
      console.log('Response id:', storeResponse.id);
      router.push(`/stores/${storeResponse.id}/modify`);
      console.log('closing');

      onClose();
    }
  }, [isPendingCreateStore, isSuccessCreateStore, storeResponse, onClose, router]);
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="bg-grey bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-black">Join us</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of store</label>
            <input
              {...register('name')}
              type="text"
              className="border-black-300 mt-1 block w-full rounded-md border p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Example store"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register('location')}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Eindhoven"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              {...register('url')}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="https://www.example.com"
            />
          </div>

          <div className="flex justify-between">
            <button type="submit" className="mt-4 rounded bg-green-500 px-4 py-2 text-white">
              Submit
            </button>

            <button
              onClick={onClose}
              type="button"
              className="padding-100 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Close
            </button>
          </div>

          {isLoading && (
            <p className="mt-4 text-center font-medium text-gray-600">Loading, please wait...</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ScraperPopup;
