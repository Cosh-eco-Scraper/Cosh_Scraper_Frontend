import 'react-time-picker/dist/TimePicker.css';
import TimeInput from '@/components/openinghours/TimeInput';
import { OpeningHour } from '@/domain/OpeningHour';

interface DayDetailProps {
  id: number;
  openingAt: string;
  closingAt: string;
  openingAtAfterNoon?: string | null;
  closingAtAfterNoon?: string | null;
  isClosed: boolean;
  hasBreak: boolean;
  day: string;
  updateHour: (id: number, hour: OpeningHour) => void;
}

export function EditOpeningHour({
  id,
  day,
  isClosed,
  openingAt,
  hasBreak,
  closingAt,
  closingAtAfterNoon,
  openingAtAfterNoon,
  updateHour,
}: DayDetailProps) {
  const CreateNewHour = (
    opening: string,
    closing: string,
    openingAn: string | null,
    closingAn: string | null
  ) => {
    return {
      id,
      day,
      openingAt: opening,
      closingAt: closing,
      openingAtAfterNoon: openingAn,
      closingAtAfterNoon: closingAn,
    } as OpeningHour;
  };

  const CheckClosed = () => {
    if (isClosed) {
      const hour = CreateNewHour('09:00', '18:00', null, null);
      updateHour(id, hour);
    } else {
      const hour = CreateNewHour('closed', 'closed', null, null);

      updateHour(id, hour);
    }
  };
  const CheckBreak = () => {
    if (hasBreak) {
      const hour = CreateNewHour(openingAt, closingAtAfterNoon!, null, null);
      updateHour(id, hour);
    } else {
      const hour = CreateNewHour(openingAt, '12:00', '13:00', closingAt);
      updateHour(id, hour);
    }
  };
  const updateOpening = (time: string) => {
    const hour = CreateNewHour(
      time,
      closingAt,
      openingAtAfterNoon ?? null,
      closingAtAfterNoon ?? null
    );
    updateHour(id, hour);
  };
  const updateClosing = (time: string) => {
    const hour = CreateNewHour(
      openingAt,
      time,
      openingAtAfterNoon ?? null,
      closingAtAfterNoon ?? null
    );
    updateHour(id, hour);
  };
  const updateOpeningAfternoon = (time: string) => {
    const hour = CreateNewHour(openingAt, closingAt, time, closingAtAfterNoon ?? null);
    updateHour(id, hour);
  };
  const updateClosingAfternoon = (time: string) => {
    const hour = CreateNewHour(openingAt, closingAt, openingAtAfterNoon ?? null, time);
    updateHour(id, hour);
  };

  return (
    <tr>
      <td className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
        {day}
      </td>

      <td className="px-4 py-2 text-center">
        <input type="checkbox" onClick={() => CheckClosed()} checked={isClosed} />
      </td>
      <td className="px-4 py-2 text-center">
        <input type="checkbox" onClick={() => CheckBreak()} checked={hasBreak} />
      </td>
      <td className="px-4 py-2 text-center">
        <TimeInput time={openingAt} isClosed={isClosed} onChange={updateOpening} />
      </td>
      <td className="px-4 py-2 text-center">
        <TimeInput time={closingAt} isClosed={isClosed} onChange={updateClosing} />
      </td>
      <td className="px-4 py-2 text-center">
        {openingAtAfterNoon && (
          <TimeInput
            time={openingAtAfterNoon}
            isClosed={isClosed}
            onChange={updateOpeningAfternoon}
          />
        )}
      </td>
      <td className="px-4 py-2 text-center">
        {closingAtAfterNoon && (
          <TimeInput
            time={closingAtAfterNoon}
            isClosed={isClosed}
            onChange={updateClosingAfternoon}
          />
        )}
      </td>
    </tr>
  );
}
