import React from 'react';
import DayDetail from './DayDetail';
import { OpeningHour } from '@/domain/OpeningHour';
import ErrorMessage from './ErrorMessage';

interface OpeningHourInformationProps {
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  openingHours?: OpeningHour[];
  updateHour?: (openingHour: OpeningHour) => void;
  readOnly?: boolean;
}

export default function OpeningHourInformation({
  isLoading,
  error,
  isError,
  openingHours,
  updateHour = () => { },
  readOnly = false,
}: OpeningHourInformationProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!openingHours) return <p>No opening hours found</p>;

  return (
    <>
      <h2 className="text-xl font-semibold text-black">Opening Hours</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left text-black">Day</th>
            <th className="w-32 px-4 py-2 text-left text-black">Opening</th>
            <th className="w-32 px-4 py-2 text-left text-black">Closing</th>
            <th className="w-20 px-4 py-2 text-center text-black">Closed?</th>
          </tr>
        </thead>

        <tbody>
          {openingHours.map(hour => (
            <DayDetail
              readOnly={readOnly}
              key={hour.id}
              day={hour.day}
              openingAt={hour.openingAt}
              closingAt={hour.closingAt}
              onChange={(openingAt, closingAt) =>
                updateHour({
                  day: hour.day,
                  openingAt,
                  closingAt,
                  id: hour.id,
                })
              }
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
