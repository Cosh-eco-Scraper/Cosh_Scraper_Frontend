import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StoreService from '../service/StoreService';

const Description: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeData'],
    queryFn: () => StoreService.getStore('1'),
  });

  const [storeData, setStoreData] = useState<{
    name: string;
    description: string;
  } | null>(null);

  if (data && !storeData) {
    setStoreData({
      name: data.name,
      description: data.description,
    });
  }

  const handleChange = (field: 'name' | 'description', value: string) => {
    setStoreData(prev => {
      if (!prev) return null;
      if (field === 'description' && value.trim() === '') {
        return { ...prev, [field]: '' };
      }
      return { ...prev, [field]: value };
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;
  if (!storeData) return null;

  return (
    <div>
      <input
        type="text"
        value={storeData.name}
        onChange={e => handleChange('name', e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2 text-3xl font-bold text-black placeholder-gray-400 focus:outline-none"
        placeholder="Store Name"
      />

      <div>
        <label className="mb-4 text-xl font-semibold text-black">Description</label>
        <textarea
          value={storeData.description}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Enter store description"
          className="w-full rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
          rows={4}
        />
      </div>
    </div>
  );
};

export default Description;
