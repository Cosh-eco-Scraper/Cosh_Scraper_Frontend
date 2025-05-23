import { Store } from '@/domain/Store';
import ErrorMessage from './ErrorMessage';

interface DescriptionProps {
  isLoading: boolean;
  error: Error | null;
  store?: Store;
  isError: boolean;
  formData: {
    name: string;
    description: string;
  };
  onFieldChange: (field: 'name' | 'description', value: string) => void;
}

export default function Description({
  isLoading,
  error,
  store,
  isError,
  formData,
  onFieldChange,
}: DescriptionProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Store Name"
        value={formData.name}
        onChange={e => onFieldChange('name', e.target.value)}
        className="mb-6 w-full rounded border border-gray-300 p-2 text-3xl font-bold text-black placeholder-gray-600 md:text-4xl"
      />
      <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
      <textarea
        value={formData.description}
        onChange={e => onFieldChange('description', e.target.value)}
        className="mb-1.5 h-36 w-full resize-none rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
        placeholder="Enter store description"
      />
    </div>
  );
}
