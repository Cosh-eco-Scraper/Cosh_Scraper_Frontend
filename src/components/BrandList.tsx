import React, { useState, useEffect, useRef } from 'react';
import { Brand } from '@/domain/Brand';
import ErrorMessage from './ErrorMessage';
import BrandChip from './BrandChip';
import AvailableBrandChip from './AvailableBrandChip';

interface BrandListProps {
  isLoading: boolean;
  error: Error | null;
  brands: Brand[]; // confirmed server brands
  allBrands?: Brand[]; // all available brands
  isError: boolean;
  customBrands?: string[]; // custom brand names
  onCustomBrandsChange?: (newList: string[]) => void;
  onRemoveBrand?: (brandId: number) => void;
  onAddBrand?: (brand: Brand) => void;
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
  const [pendingAdds, setPendingAdds] = useState<Brand[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cleanup pending once server confirms
  useEffect(() => {
    const confirmedIds = new Set(brands.map(b => b.id));
    setPendingAdds(prev => prev.filter(b => !confirmedIds.has(b.id)));
  }, [brands]);

  const addCustomBrand = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onCustomBrandsChange?.([...customBrands, trimmed]);
    setName('');
  };

  const handleAddAvailableBrand = (brand: Brand) => {
    setPendingAdds(prev => [...prev, brand]);
    onAddBrand?.(brand);
  };

  const removeServerBrand = (id: number) => onRemoveBrand?.(id);
  const removePendingBrand = (id: number) => setPendingAdds(prev => prev.filter(b => b.id !== id));
  const removeCustomBrand = (label: string) =>
    onCustomBrandsChange?.(customBrands.filter(n => n !== label));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;

  // Build lists
  const serverChips = brands.map(b => ({
    key: `s-${b.id}`,
    label: b.name,
    onRemove: () => removeServerBrand(b.id),
  }));
  const pendingChips = pendingAdds.map(b => ({
    key: `p-${b.id}`,
    label: b.name,
    onRemove: () => removePendingBrand(b.id),
  }));
  const customChips = customBrands.map(n => ({
    key: `c-${n}`,
    label: n,
    onRemove: () => removeCustomBrand(n),
  }));

  // Determine availability
  const selectedIds = new Set([...brands, ...pendingAdds].map(b => b.id));
  const selectedNames = new Set([
    ...brands.map(b => b.name.toLowerCase()),
    ...pendingAdds.map(b => b.name.toLowerCase()),
    ...customBrands.map(n => n.toLowerCase()),
  ]);
  const available = allBrands.filter(
    b => !selectedIds.has(b.id) && !selectedNames.has(b.name.toLowerCase())
  );

  // Filter suggestions based on input
  const filteredAvailable = !readOnly && name.trim()
    ? available.filter(b =>
        b.name.toLowerCase().includes(name.trim().toLowerCase())
      )
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSelectSuggestion = (brand: Brand) => {
    handleAddAvailableBrand(brand);
    setName('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = name.trim();
      const match = available.find(
        b => b.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (match) {
        handleSelectSuggestion(match);
      } else {
        addCustomBrand();
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>

      {!readOnly && (
        <div className="mb-4 relative">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Brand name"
              value={name}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full rounded border px-2 py-1 text-sm text-black"
            />
            <button
              onClick={() => {
                const trimmed = name.trim();
                const match = available.find(
                  b => b.name.toLowerCase() === trimmed.toLowerCase()
                );
                if (match) handleSelectSuggestion(match);
                else addCustomBrand();
              }}
              className="rounded bg-[#583AFF] px-3 py-1.5 text-white hover:bg-[#4a32d9]"
            >
              Add
            </button>
          </div>
          {filteredAvailable.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded border bg-white">
              {filteredAvailable.map(b => (
                <li
                  key={b.id}
                  onClick={() => handleSelectSuggestion(b)}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-200"
                >
                  {b.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="m-1 mb-2 text-sm font-medium text-black">Your brands</h3>
        <div className="flex flex-wrap gap-3">
          {serverChips.concat(pendingChips, customChips).length === 0 ? (
            <p className="text-sm text-gray-500">No brands selected yet.</p>
          ) : (
            serverChips
              .concat(pendingChips, customChips)
              .map(chip => (
                <BrandChip
                  key={chip.key}
                  name={chip.label}
                  label=""
                  onRemove={chip.onRemove}
                  readOnly={readOnly}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}
