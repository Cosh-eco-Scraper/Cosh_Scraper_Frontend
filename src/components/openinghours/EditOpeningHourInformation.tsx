// In EditOpeningHourInformation.tsx
import React from 'react';
import { OpeningHour } from '@/domain/OpeningHour';
import { EditOpeningHour } from '@/components/openinghours/EditOpeningHour';

interface EditOpeningHourInformationProps {
  openingHours: OpeningHour[];
  updateHour: (id: number, hour: OpeningHour) => void;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
}

export default function EditOpeningHourInformation({
  openingHours,
  updateHour,
  isLoading,
  error,
  isError,
}: EditOpeningHourInformationProps) {
  if (isLoading) return <div>Loading opening hours...</div>;
  if (isError) return <div>Error loading opening hours: {error?.message}</div>;
  if (!openingHours || openingHours.length === 0) return <div>No opening hours available.</div>;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h3 className="mb-4 text-xl font-semibold">Opening Hours</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="inter-light px-4 py-2 text-left text-xs uppercase">Day</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Closed</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Break</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Open</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Close</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Afternoon Open</th>
            <th className="inter-light px-4 py-2 text-center text-xs uppercase">Afternoon Close</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {[...openingHours]
            .sort((a, b) => {
              const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ];
              return days.indexOf(a.day) - days.indexOf(b.day);
            })
            .map(hour => (
              <EditOpeningHour
                key={hour.id}
                id={hour.id}
                openingAt={hour.openingAt}
                closingAt={hour.closingAt}
                openingAtAfterNoon={hour.openingAtAfterNoon}
                closingAtAfterNoon={hour.closingAtAfterNoon}
                isClosed={
                  (hour.openingAt === null && hour.closingAt === null) ||
                  (hour.openingAt === 'closed' && hour.closingAt === 'closed')
                }
                day={hour.day}
                hasBreak={hour.openingAtAfterNoon !== null && hour.closingAtAfterNoon !== null}
                updateHour={updateHour}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
