import Label from './Label';

interface BrandChipProps {
  name: string;
  label: string;
}

export default function BrandChip({ name, label }: BrandChipProps) {
  return (
    <span className="flex items-center gap-1 rounded-full bg-[#583AFF] px-3 py-1.5 text-sm text-white shadow">
      {name}
      {label && <Label label={label} />}
    </span>
  );
}
