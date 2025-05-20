import { useQuery } from '@tanstack/react-query';
import React from 'react';
import StoreService from '../service/StoreService';

const Brands: React.FC = () => {
  // const fetchDescription = async () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeBrands'],
    queryFn: () => StoreService.getStoreBrands('1'), // Replace '1' with the actual store ID you want to fetch
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>
      <div className="flex flex-wrap gap-3">
        {Array.isArray(data) && data.length > 0 ? (
          data.map(item => (
            <span
              key={item.id}
              className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 shadow transition hover:bg-gray-300"
            >
              {item.name}
            </span>
          ))
        ) : (
          <p className="text-gray-600">No brands found.</p>
        )}
      </div>
    </div>
  );
};

export default Brands;
