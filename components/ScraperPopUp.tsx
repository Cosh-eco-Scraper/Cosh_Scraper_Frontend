import React from 'react';

interface MyPopupProps {
  open: boolean;
  onClose: () => void;
}

const ScraperPopup: React.FC<MyPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-grey bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-black">Join us</h2>
        
      <form className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">Name of store</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter your store name"
            />

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL to your website</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Enter the url to your website"
            />
          </div>


           <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded padding-100">
          Close
        </button>

          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Submit
          </button>
          </form>


       
      </div>
    </div>
  );
};

export default ScraperPopup;
