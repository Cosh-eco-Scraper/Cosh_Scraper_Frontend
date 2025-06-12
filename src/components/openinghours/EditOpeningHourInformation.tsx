// In EditOpeningHourInformation.tsx
import React, { useCallback } from 'react';
import { OpeningHour } from '@/domain/OpeningHour';
import { EditOpeningHour } from './EditOpeningHour'; // Adjust path as needed

interface EditOpeningHourInformationProps {
  openingHours: OpeningHour[];
  updateHour: (hour: {
    id: string;
    day: string;
    openingAt: string | null | undefined;
    closingAt: string | null | undefined;
    openingAtAfternoon: any;
    closingAtAfternoon: any;
  }) => void;
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
            <th className="px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
              Break
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Day
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Morning Open
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Morning Close
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Afternoon Open
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
              Afternoon Close
            </th>
            <th className="px-4 py-2 text-center text-xs font-medium tracking-wider text-gray-500 uppercase">
              Closed
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {openingHours.map(hour => (
            <EditOpeningHour
              key={hour.id} // Important: Ensure hour.id is unique and stable
              id={hour.id} // <-- PASS THE ID PROP TO EditOpeningHour
              day={hour.day}
              openingAt={hour.openingAt}
              closingAt={hour.closingAt}
              openingAtAfterNoon={hour.openingAtAfterNoon}
              closingAtAfterNoon={hour.closingAtAfterNoon}
              // VITAL FIX: Use useCallback here to stabilize the onChange handler
              onChange={useCallback(
                (
                  // <-- WRAP IN USECALLBACK
                  id: any, // <-- RECEIVE ID
                  day: any, // <-- RECEIVE DAY
                  openingAt: any,
                  closingAt: any,
                  openingAtAfterNoon: any,
                  closingAtAfterNoon: any
                ) => {
                  updateHour({
                    // Call the parent's updateHour
                    id: id, // Use the ID received from EditOpeningHour
                    day: day, // Use the day received from EditOpeningHour
                    openingAt,
                    closingAt,
                    openingAtAfternoon: openingAtAfterNoon, // Ensure consistent naming (Afternoon vs AfterNoon)
                    closingAtAfternoon: closingAtAfterNoon,
                    // You might need to copy other properties if updateHour expects a full object,
                    // but try to keep it minimal to only what's changed/needed for updateHour's logic.
                    // For now, assume updateHour just uses ID and new times.
                    // If other properties (like 'storeId') are *always* stable for this hour,
                    // they can be pulled from the 'hour' closure, but the goal is to make this callback stable.
                  });
                },
                []
              )} // <-- Empty dependency array! This callback is now stable.
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
