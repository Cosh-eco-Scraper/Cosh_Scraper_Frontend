import React from 'react';
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
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!brands) return <p className="text-gray-600">No brands found.</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Brands</h2>
      <div className="flex flex-wrap gap-3">
        {brands.map(item => (
          <BrandChip key={item.id} name={item.name} />
        ))}
      </div>
    </div>
  );
}
