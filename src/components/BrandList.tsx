import React, { useState } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';
import AvailableBrandChip from './AvailableBrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands: Brand[]; // selected server brands passed from parent
  allBrands: Brand[]; // all available brands from backend
  isError: boolean;
  customBrands?: string[]; // custom brand names
  onCustomBrandsChange?: (newList: string[]) => void; // update custom brands
  onRemoveBrand?: (brandId: number) => void; // remove any server brand
  onAddBrand?: (brand: Brand) => void; // add a server brand
  readOnly?: boolean;
}

export default function BrandList({
  isLoading,
  error,
  brands,
  allBrands = [],
  isError,
  customBrands = [],
  onCustomBrandsChange,
  onRemoveBrand,
  onAddBrand,
  readOnly = false,
}: BrandListProps) {
  const [name, setName] = useState('');

  const addCustomBrand = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const next = [...customBrands, trimmed];
    onCustomBrandsChange?.(next);
    setName('');
  };

  const handleRemove = (chipIndex: number) => {
    // Calculate the boundary between server brands and custom brands
    const serverBrandsCount = brands.length;
    if (chipIndex < serverBrandsCount) {
      // Removing a server brand
      const brandToRemove = brands[chipIndex];
      onRemoveBrand?.(brandToRemove.id);
    } else {
      // Removing a custom brand
      const customBrandIndex = chipIndex - serverBrandsCount;
      const updatedCustomBrands = customBrands.filter((_, index) => index !== customBrandIndex);
      onCustomBrandsChange?.(updatedCustomBrands);
    }
  };

  const handleAddAvailableBrand = (brand: Brand) => {
    onAddBrand?.(brand);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;

  // Get selected brand IDs and names for filtering
  const selectedBrandIds = new Set(brands.map(b => b.id));
  const selectedBrandNames = new Set([
    ...brands.map(b => b.name.toLowerCase()),
    ...customBrands.map(n => n.toLowerCase()),
  ]);

  // Filter available brands to show only unselected ones
  const availableBrands = allBrands.filter(
    brand => !selectedBrandIds.has(brand.id) && !selectedBrandNames.has(brand.name.toLowerCase())
  );

  const allBrandNames = [...brands.map(b => b.name), ...customBrands];

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      {/* Manual brand input */}
      {!readOnly && (
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Brand name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded border px-2 py-1 text-sm text-black"
          />
          <button
            onClick={addCustomBrand}
            className="rounded bg-[#583AFF] px-3 py-1.5 text-white hover:bg-[#4a32d9]"
          >
            Add
          </button>
        </div>
      )}

      {/* Available brands to add */}
      {!readOnly && availableBrands.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-black">Available Brands</h3>
          <div className="flex flex-wrap gap-3">
            {availableBrands.map(brand => (
              <AvailableBrandChip key={brand.id} brand={brand} onClick={handleAddAvailableBrand} />
            ))}
          </div>
        </div>
      )}

      {/* Selected brands */}
      <div className="mb-6">
        <h3 className="m-1 mb-2 text-sm font-medium text-black">Your brands</h3>
        <div className="flex flex-wrap gap-3">
          {allBrandNames.length === 0 ? (
            <p className="text-sm text-gray-500">No brands selected yet.</p>
          ) : (
            allBrandNames.map((n, idx) => (
              <BrandChip
                key={idx}
                name={n}
                label=""
                onRemove={() => handleRemove(idx)}
                readOnly={readOnly}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
