interface BrandChipProps {
  name: string;
}

export default function BrandChip({ name }: BrandChipProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 shadow transition hover:bg-gray-300">
      {name}
    </span>
  );
}
