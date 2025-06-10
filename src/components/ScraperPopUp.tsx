import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useModifyStores from '@/hooks/store/useMofifyStores';
import { CreateStore } from '@/domain/Store';
import { ErrorMessage } from '@hookform/error-message';
import { useWebSocket } from '@/hooks/websocket/useWebSocket';

interface MyPopupProps {
  open: boolean;
  onClose: () => void;
}

const ScraperPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  const {
    data: progress,
    recieveMessage,
    closeConnection,
  } = useWebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateStore>();
  const { createStore, isPendingCreateStore, isSuccessCreateStore, storeResponse } =
    useModifyStores();

  const onSubmit = async (data: CreateStore) => {
    try {
      await createStore(data);
    } catch (err) {
      console.error('create store failed', err);
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

      closeConnection();
      onClose();
    }
  }, [isPendingCreateStore, isSuccessCreateStore, storeResponse, onClose, router]);
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  recieveMessage();

  return (
    <div
      onClick={handleBackgroundClick}
      className="bg-grey bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="w-[480px] rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-black">Join us</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of store</label>
            <input
              {...register('name', { required: 'Store name is required' })}
              type="text"
              className="border-black-300 mt-1 block w-full rounded-md border p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Example store"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p className="text-red-500">{message}</p>}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              {...register('location', { required: 'City is required' })}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Eindhoven"
            />
            <ErrorMessage
              errors={errors}
              name="location"
              render={({ message }) => <p className="text-red-500">{message}</p>}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              {...register('url', { required: 'URL is required' })}
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="https://www.example.com"
            />
            <ErrorMessage
              errors={errors}
              name="url"
              render={({ message }) => <p className="text-red-500">{message}</p>}
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="mb-2 rounded-full bg-[#583AFF] px-10 py-3 text-lg font-semibold text-white transition hover:bg-[#2F007B]"
            >
              Submit
            </button>

            <button
              onClick={onClose}
              type="button"
              className="mb-2 rounded-full bg-[#F16254] px-10 py-3 text-lg font-semibold text-white transition hover:bg-[#ff5858]"
            >
              Close
            </button>
          </div>

          {isLoading && (
            <p className="mt-4 text-center font-medium text-gray-600">Loading, please wait...</p>
          )}
          {progress && <p className="mt-4 text-center font-medium text-gray-600">{progress}</p>}
        </form>
      </div>
    </div>
  );
};

export default ScraperPopup;
