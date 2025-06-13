import React from 'react';
import { Brand } from '@/domain/Brand';

interface AvailableBrandChipProps {
  brand: Brand;
  onClick: (brand: Brand) => void;
  disabled?: boolean;
}

export default function AvailableBrandChip({
  brand,
  onClick,
  disabled = false,
}: AvailableBrandChipProps) {
  return (
    <button
      onClick={() => onClick(brand)}
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
        disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
          : 'cursor-pointer border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400 hover:bg-gray-100'
      } `}
    >
      <span className="text-xs text-gray-400">+</span>
      {brand.name}
    </button>
  );
}
