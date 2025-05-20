import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import StoreService from '../service/StoreService';



const Location: React.FC = () => {


  // const fetchDescription = async () => {
const { data, isLoading, error } = useQuery({
    queryKey: ['storeData'],
    queryFn: () => StoreService.getStore('1'), // Replace '1' with the actual store ID you want to fetch
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-black">Location</h2>
      <ul className="space-y-2 text-black">
        {data.street} {data.number}, {data.postalCode} {data.city}
      </ul>
    </div>
  );
};

export default Location;
