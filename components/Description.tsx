import { useQuery } from '@tanstack/react-query';
import React from 'react';
import StoreService from '../service/StoreService';

const Description: React.FC = () => {
  // const fetchDescription = async () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeData'],
    queryFn: () => StoreService.getStore('1'), // Replace '1' with the actual store ID you want to fetch
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-black md:text-4xl">{data.name}</h1>

      <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
      <ul className="space-y-2 text-black">
        <p>{data.description}</p>
      </ul>
    </div>
  );
};

export default Description;
