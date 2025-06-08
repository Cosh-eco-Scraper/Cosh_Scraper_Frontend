import { Store } from '@/domain/Store';
import ErrorMessage from './ErrorMessage';

interface DescriptionProps {
  isLoading: boolean;
  error: Error | null;
  store?: Store;
  isError: boolean;
  readOnly?: boolean;
  formData?: {
    name: string;
    description: string;
    retour: string;
  };
  onFieldChange?: (field: 'name' | 'description' | 'retour', value: string) => void;
}

export default function Description({
  isLoading,
  error,
  store,
  isError,
  formData,
  onFieldChange,
  readOnly = false,
}: DescriptionProps) {
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <ErrorMessage error={error} />;
  if (!store) return <p>No store found</p>;

  const nameValue = formData?.name || store.name;
  const descriptionValue = formData?.description || store.description;
  const retourValue = formData?.retour || store.retour;

  return (
    <div>
      {readOnly ? (
        <p className="mb-6 w-full rounded p-2 text-3xl font-bold text-black md:text-4xl">
          {nameValue}
        </p>
      ) : (
        <input
          type="text"
          placeholder="Store Name"
          value={nameValue}
          onChange={e => onFieldChange?.('name', e.target.value)}
          className="mb-6 w-full rounded border border-gray-300 p-2 text-3xl font-bold text-black placeholder-gray-600 md:text-4xl"
        />
      )}

      <h2 className="mb-4 text-xl font-semibold text-black">Description</h2>
      {readOnly ? (
        <p className="mb-1.5 w-full rounded px-3 py-2 text-sm whitespace-pre-wrap text-black placeholder-gray-400 shadow">
          {descriptionValue}
        </p>
      ) : (
        <textarea
          value={descriptionValue}
          onChange={e => onFieldChange?.('description', e.target.value)}
          className="mb-1.5 h-36 w-full resize-none rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
          placeholder="Enter store description"
        />
      )}

      <h2 className="mt-6 mb-4 text-xl font-semibold text-black">Return Policy</h2>
      {readOnly ? (
        <p className="mb-1.5 w-full rounded px-3 py-2 text-sm whitespace-pre-wrap text-black placeholder-gray-400 shadow">
          {retourValue}
        </p>
      ) : (
        <textarea
          value={retourValue}
          onChange={e => onFieldChange?.('retour', e.target.value)}
          className="mb-1.5 h-24 w-full resize-none rounded border px-3 py-2 text-sm text-black placeholder-gray-400 shadow"
          placeholder="Enter return policy"
        />
      )}
    </div>
  );
}
