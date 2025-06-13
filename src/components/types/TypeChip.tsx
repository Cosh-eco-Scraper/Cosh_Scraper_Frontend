import React from 'react';

interface TypeChipProps {
  name: string;
}

export default function TypeChip({ name }: TypeChipProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow">
      {name}
    </span>
  );
}
