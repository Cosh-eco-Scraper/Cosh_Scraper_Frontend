import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import StoreService from '../service/StoreService';



const Brands: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // const fetchDescription = async () => {
const { data, isLoading, error } = useQuery({
    queryKey: ['storeBrands'],
    queryFn: () => StoreService.getStoreBrands('1'), // Replace '1' with the actual store ID you want to fetch
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
     <div>
      <h2 className="text-xl font-semibold mb-4 text-black">Brands</h2>
      <div className="flex flex-wrap gap-3">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item: any) => (
            <span
              key={item.id}
              className="inline-flex items-center px-4 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-full shadow hover:bg-gray-300 transition"
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
