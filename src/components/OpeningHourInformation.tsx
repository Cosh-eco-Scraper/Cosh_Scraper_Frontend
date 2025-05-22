import React, { useState } from 'react';
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
  const [hours, setHours] = useState<OpeningHour[]>(openingHours ?? []);

  const updateHour = (day: string, field: 'openingAt' | 'closingAt', value: string) => {
    setHours(prev =>
      prev.map(hour =>
        hour.day === day ? { ...hour, [field]: value } : hour
      )
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!openingHours) return <p>No opening hours found</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Opening Hours</h2>
      <ul className="space-y-2 text-black">
        {hours.map(hour => (
          <DayDetail
            key={hour.id}
            day={hour.day}
            openingAt={hour.openingAt}
            closingAt={hour.closingAt}
            onChange={(field, value) => updateHour(hour.day, field, value)}
          />
        ))}
      </ul>
    </div>
  );
}
