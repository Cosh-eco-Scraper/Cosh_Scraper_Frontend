import React from 'react';

interface MyPopupProps {
  open: boolean;
  onClose: () => void;
}

const ScraperPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  return (
    <div className="bg-grey bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-96 rounded bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-black">Join us</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name of store</label>
            <input
              type="text"
              className="mt-1 placeholder-gray-400 text-black block w-full rounded-md border border-black-300 p-2 shadow-sm"
              placeholder="Enter your store name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL to your website</label>
            <input
              type="text"
              className="mt-1 placeholder-gray-400 text-black block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              placeholder="Enter the url to your website"
            />
          </div>

          <button
            onClick={onClose}
            className="padding-100 mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Close
          </button>

          <button type="submit" className="mt-4 rounded bg-green-500 px-4 py-2 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScraperPopup;
