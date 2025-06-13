import {X} from 'lucide-react';

interface BrandChipProps {
  id: number
  name: string;
  label?: string; // Optional label for additional information
  onRemove?: (id: number) => void;
  readOnly?: boolean; // Optional prop to indicate if the chip is read-only
}

export default function EditBrandChip({id, name, label, readOnly, onRemove}: BrandChipProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow">
      {name}
      {label && <span className="text-xs text-gray-200">{label}</span>}
      {!readOnly && onRemove && (
          <button onClick={() => onRemove(id)} className="ml-1 text-white hover:text-red-500">
          <X size={14} />
        </button>
      )}
    </span>
  );
}
