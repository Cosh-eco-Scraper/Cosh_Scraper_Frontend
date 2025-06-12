import React, { useState } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands?: Brand[];            // server-fetched Brand objects
  isError: boolean;
  customBrands?: string[];
  onCustomBrandsChange?: (newList: string[]) => void;
  readOnly?: boolean;
}

export default function BrandList({
  isLoading,
  error,
  brands = [],
  isError,
  customBrands = [],
  onCustomBrandsChange,
  readOnly = false,
}: BrandListProps) {
  const [name, setName] = useState('');

  if (isLoading) return <p>Loading...</p>;
  if (isError)   return <ErrorMessage error={error} />;

  // merge server brands and custom string names
  const allBrandNames = [
    ...brands.map(b => b.name),
    ...customBrands
  ];

  const addBrand = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = [...customBrands, trimmed];
    if (onCustomBrandsChange) {
      onCustomBrandsChange(next);
    }
    setName('');
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      {/* only show input when not readOnly */}
      {!readOnly && (
        <div className="mb-4 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Brand name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded border px-2 py-1 text-sm text-black"
          />
          <button
            onClick={addBrand}
            className="bg-[#583AFF] text-white px-3 py-1.5 rounded"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {allBrandNames.length === 0 ? (
          <p className="text-sm text-gray-500">No brands added yet.</p>
        ) : (
          allBrandNames.map((name, idx) => (
            <BrandChip key={idx} name={name} label="" />
          ))
        )}
      </div>
    </div>
  );
}
