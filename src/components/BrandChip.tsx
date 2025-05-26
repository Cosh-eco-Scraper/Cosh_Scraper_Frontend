import {X} from 'lucide-react';

interface BrandChipProps {
    name: string;
    onRemove?: () => void;
}

export default function BrandChip({name, onRemove}: BrandChipProps) {
    return (
        <span className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow">
      {name}
    </span>
    );
}
