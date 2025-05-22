interface DayDetailProps {
  openingAt: string;
  closingAt: string;
  day: string;
  onChange: (field: 'openingAt' | 'closingAt', value: string) => void;
}

export default function DayDetail({ openingAt, closingAt, day, onChange }: DayDetailProps) {
  const isClosed = openingAt === 'closed' || closingAt === 'closed';

  return (
    <li className="flex items-center gap-4">
      <span className="w-20 font-medium">{day}:</span>
      {isClosed ? (
        <span>Closed</span>
      ) : (
        <>
          <input
            type="text"
            value={openingAt}
            onChange={(e) => onChange('openingAt', e.target.value)}
            className="w-20 rounded border px-2 py-1 text-sm"
          />
          <span>-</span>
          <input
            type="text"
            value={closingAt}
            onChange={(e) => onChange('closingAt', e.target.value)}
            className="w-20 rounded border px-2 py-1 text-sm"
          />
        </>
      )}
    </li>
  );
}
