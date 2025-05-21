import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import StoreService from '../service/StoreService';

type OpeningHour = {
  id: number;
  day: string;
  openingAt: string;
  closingAt: string;
};

const Openhours: React.FC = () => {
  const { data, isLoading, error } = useQuery<OpeningHour[]>({
    queryKey: ['storeOpeningsHours'],
    queryFn: () => StoreService.getStoreOpeningsHours('1'),
  });

  const [hours, setHours] = useState<OpeningHour[] | null>(null);

  if (data && hours === null) {
    setHours(data);
  }

  const handleChange = (id: number, field: 'openingAt' | 'closingAt', value: string) => {
    setHours(prev => {
      if (!prev) return null;
      return prev.map(item =>
        item.id === id
          ? {
              ...item,
              [field]: value.toLowerCase() === 'closed' ? 'closed' : value,
              ...(field === 'openingAt' && value.toLowerCase() === 'closed'
                ? { closingAt: 'closed' }
                : {}),
              ...(field === 'closingAt' && value.toLowerCase() === 'closed'
                ? { openingAt: 'closed' }
                : {}),
            }
          : item
      );
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{(error as Error).message}</p>;
  if (!hours) return null;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Opening Hours</h2>
      <div className="space-y-4 text-black">
        {hours.map(item => (
          <div key={item.id} className="flex flex-col gap-1">
            <span className="font-medium">{item.day}</span>
            {item.openingAt === 'closed' || item.closingAt === 'closed' ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value="closed"
                  onChange={e => handleChange(item.id, 'openingAt', e.target.value)}
                  className="w-32 rounded border px-2 py-1 text-sm"
                />
                <input
                  type="text"
                  value="closed"
                  onChange={e => handleChange(item.id, 'closingAt', e.target.value)}
                  className="w-32 rounded border px-2 py-1 text-sm"
                />
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={item.openingAt}
                  onChange={e => handleChange(item.id, 'openingAt', e.target.value)}
                  className="w-32 rounded border px-2 py-1 text-sm"
                />
                <input
                  type="text"
                  value={item.closingAt}
                  onChange={e => handleChange(item.id, 'closingAt', e.target.value)}
                  className="w-32 rounded border px-2 py-1 text-sm"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Openhours;
