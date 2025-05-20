import { useQuery } from '@tanstack/react-query';
import React from 'react';
import StoreService from '../service/StoreService';

const Openhours: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['storeOpeningsHours'],
    queryFn: () => StoreService.getStoreOpeningsHours('1'), // Replace '1' with actual store ID
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Opening Hours</h2>
      <ul className="space-y-2 text-black">
        {Array.isArray(data) &&
          data.map(item => {
            const isClosed = item.openingAt === 'closed' || item.closingAt === 'closed';

            return (
              <li key={item.id}>
                <span className="font-medium">{item.day}:</span>{' '}
                {isClosed ? 'Closed' : `${item.openingAt} - ${item.closingAt}`}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Openhours;
