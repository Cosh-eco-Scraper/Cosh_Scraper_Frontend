import router from 'next/router';
import React, { useState } from 'react';

interface MyPopupProps {
  open: boolean;
  onClose: () => void;
}

const ScraperPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const ConfirmScraper = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload on form submit
    setIsLoading(true);

    // Simulate async operation (like API call)
    setTimeout(() => {
      router.push('/info'); // navigate after loading
    }, 1500);
  };

  return (
    <div className="bg-grey bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-black">Join us</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of store</label>
            <input
              type="text"
              className="border-black-300 mt-1 block w-full rounded-md border p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Enter your store name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL to your website</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-black placeholder-gray-400 shadow-sm"
              placeholder="Enter the url to your website"
            />
          </div>

          <button
            onClick={onClose}
            className="padding-100 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Close
          </button>

          <button
            onClick={ConfirmScraper}
            type="submit"
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
          >
            Submit
          </button>

          {isLoading && (
            <p className="mt-4 text-center font-medium text-gray-600">Loading, please wait...</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ScraperPopup;
