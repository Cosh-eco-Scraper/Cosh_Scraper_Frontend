interface DayDetailProps {
  openingAt: string;
  closingAt: string;
  day: string;
  onChange: (field: 'openingAt' | 'closingAt', value: string) => void;
}

export default function DayDetail({ openingAt, closingAt, day, onChange }: DayDetailProps) {
  const isClosed = openingAt === 'closed' || closingAt === 'closed';

  const handleToggleClosed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      onChange('openingAt', 'closed');
      onChange('closingAt', 'closed');
    } else {
      onChange('openingAt', '09:00'); // or use previous value / placeholder
      onChange('closingAt', '17:00');
    }
  };

  return (
    <tr className="border-t border-gray-300">
      <td className="px-4 py-2 font-medium text-black">{day}</td>

      <td className="px-4 py-2">
        {!isClosed ? (
          <input
            type="time"
            value={openingAt}
            onChange={e => onChange('openingAt', e.target.value)}
            className="w-full rounded border px-2 py-1 text-sm text-black"
            min="00:00"
            max="23:59"
          />
        ) : (
          <span className="text-gray-400 italic">Closed</span>
        )}
      </td>

      <td className="px-4 py-2">
        {!isClosed ? (
          <input
            type="time"
            value={closingAt}
            onChange={e => onChange('closingAt', e.target.value)}
            className="w-full rounded border px-2 py-1 text-sm text-black"
            min="00:00"
            max="23:59"
          />
        ) : (
          <span className="text-gray-400 italic">Closed</span>
        )}
      </td>

      <td className="px-4 py-2 text-center">
        <input
          type="checkbox"
          checked={isClosed}
          onChange={handleToggleClosed}
          className="cursor-pointer"
        />
      </td>
    </tr>
  );
}
