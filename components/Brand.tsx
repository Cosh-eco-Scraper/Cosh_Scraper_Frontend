import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StoreService from '../service/StoreService';
import { X } from 'lucide-react';

// interface Brand {
//   id: number;
//   name: string;
//   label: string;
//   storeId: number;
// }

const Brands: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeBrands'],
    queryFn: () => StoreService.getStoreBrands('1'),
  });

  const [brands, setBrands] = useState<{ id: string; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');

  if (data && brands.length === 0) {
    setBrands(data);
  }

  const handleAddBrand = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !brands.some(b => b.name.toLowerCase() === trimmed.toLowerCase())) {
      const newBrand = {
        id: `temp-${Date.now()}`,
        name: trimmed,
      };
      setBrands([...brands, newBrand]);
      setInputValue('');
    }
  };

  const handleRemoveBrand = (id: string) => {
    setBrands(brands.filter(b => b.id !== id));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAddBrand()}
          placeholder="Add a brand"
          className="rounded border px-3 py-1 text-sm text-black shadow placeholder:text-gray-500"
        />
        <button
          onClick={handleAddBrand}
          className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {brands.map(brand => (
          <span
            key={brand.id}
            className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow"
          >
            {brand.name}
            <button
              onClick={() => handleRemoveBrand(brand.id)}
              className="ml-1 text-white hover:text-red-500"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Brands;
