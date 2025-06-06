import React from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface DayDetailProps {
  openingAt: string;
  closingAt: string;
  day: string;
  onChange?: (openingAt: string, closingAt: string) => void;
  readOnly?: boolean;
}

export default function DayDetail({
  openingAt,
  closingAt,
  day,
  onChange = () => {},
  readOnly,
}: DayDetailProps) {
  const isClosed = openingAt === 'closed' || closingAt === 'closed';

  const handleToggleClosed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      onChange('closed', 'closed');
    } else {
      onChange('09:00', '17:00');
    }
  };

  const toDateFromString = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleOpeningChange = (value: string | null) => {
    console.log('Opening change:', value);
    if (value) onChange(value, closingAt);
  };

  const handleClosingChange = (value: string | null) => {
    console.log('Closing change:', value);
    if (value) onChange(openingAt, value);
  };

  return (
    <tr className="border-t border-gray-300">
      <td className="px-4 py-2 font-medium text-black">{day}</td>

      <td className="px-4 py-2 text-black">
        {!isClosed ? (
          <TimePicker
            value={toDateFromString(openingAt)}
            onChange={handleOpeningChange}
            format="hh:mm a"
            clearIcon={null}
            disableClock={true}
            disabled={readOnly}
          />
        ) : (
          <span className="text-gray-400 italic">Closed</span>
        )}
      </td>

      <td className="px-4 py-2 text-black">
        {!isClosed ? (
          <TimePicker
            value={toDateFromString(closingAt)}
            onChange={handleClosingChange}
            disableClock={true}
            clearIcon={null}
            format="hh:mm a"
            disabled={readOnly}
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
          readOnly={readOnly}
          disabled={readOnly}
        />
      </td>
    </tr>
  );
}
