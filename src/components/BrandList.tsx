import React, { useState } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands?: Brand[];
  isError: boolean;
}

export default function BrandList({ isLoading, error, brands, isError }: BrandListProps) {
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [modified, setModified] = useState(false);

  const currentBrands = modified ? brandList : (brands ?? []);

  const handleAddBrand = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !currentBrands.some(b => b.name.toLowerCase() === trimmed.toLowerCase())) {
      const newBrand: Brand = {
        id: Date.now(),
        name: trimmed,
        label: trimmed,
        storeId: brands?.at(0)?.storeId ?? 0,
      };
      setBrandList([...currentBrands, newBrand]);
      setInputValue('');
      setModified(true);
    }
  };

  const handleRemoveBrand = (id: string | number) => {
    setBrandList(currentBrands.filter(b => b.id !== id));
    setModified(true);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;

  const emptyBrands = !brands || brands.length === 0;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      <div className="flex flex-wrap gap-3">
        {emptyBrands && <p className="text-sm text-gray-500">No brands added yet.</p>}
        {!emptyBrands &&
          brands.map(item => (
            <BrandChip key={item.id} name={item.name} onRemove={() => handleRemoveBrand(item.id)} />
          ))}
      </div>
    </div>
  );
}
