interface BrandChipProps {
  name: string;
  label?: string; // Optional label for additional information
}

export default function BrandChip({ name, label }: BrandChipProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow">
      {name}
      {label && <span className="text-xs text-gray-200">{label}</span>}
    </span>
  );
}
