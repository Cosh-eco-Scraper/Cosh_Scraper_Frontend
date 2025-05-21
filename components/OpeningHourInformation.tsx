import React from 'react';
import DayDetail from './DayDetail';
import { OpeningHour } from '@/domain/OpeningHour';
import ErrorMessage from './ErrorMessage';

interface OpeningHourInformationProps {
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  openingHours?: OpeningHour[];
}

export default function OpeningHourInformation({
  isLoading,
  error,
  isError,
  openingHours,
}: OpeningHourInformationProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!openingHours) return <p>No opening hours found</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Opening Hours</h2>
      <ul className="space-y-2 text-black">
        {Array.isArray(openingHours) &&
          openingHours.map(openingHour => (
            <DayDetail
              key={openingHour.id}
              closingAt={openingHour.closingAt}
              day={openingHour.day}
              openingAt={openingHour.openingAt}
            />
          ))}
      </ul>
    </div>
  );
}
