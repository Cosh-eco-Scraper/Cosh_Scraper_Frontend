import { Store } from '@/domain/Store';
import ErrorMessage from './ErrorMessage';

interface LocationFormData {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
}

interface LocationInformationProps {
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
  store?: Store;
  formData?: LocationFormData;
  onFieldChange?: (field: keyof LocationFormData, value: string) => void;
  readOnly?: boolean;
}

export default function LocationInformation({
  isLoading,
  error,
  isError,
  store,
  formData,
  onFieldChange,
  readOnly = false,
}: LocationInformationProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;

  const street = formData?.street || store.street;
  const number = formData?.number || store.number;
  const postalCode = formData?.postalCode || store.postalCode;
  const city = formData?.city || store.city;
  const country = formData?.country || store.country;

  const locationString = `${street} ${number}, ${postalCode} ${city}, ${country}`;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black">Location</h2>

      {readOnly ? (
        <p className="w-full rounded px-3 py-2 text-sm whitespace-pre-wrap text-black shadow">
          {locationString}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Street</label>
            <input
              type="text"
              value={street}
              onChange={e => onFieldChange?.('street', e.target.value)}
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Number</label>
            <input
              type="text"
              value={number}
              onChange={e => onFieldChange?.('number', e.target.value)}
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Postal Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={e => onFieldChange?.('postalCode', e.target.value)}
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Country</label>
            <input
              type="text"
              value={country}
              onChange={e => onFieldChange?.('country', e.target.value)}
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">City</label>
            <input
              type="text"
              value={city}
              onChange={e => onFieldChange?.('city', e.target.value)}
              className="w-full rounded border px-3 py-1.5 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
