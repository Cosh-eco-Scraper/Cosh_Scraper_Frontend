import {Store} from '@/domain/Store';
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
    if (isError) return <ErrorMessage error={error}/>;
    if (!store) return <p>No store found</p>;

    return (
        <div>
            <h2 className="mb-4 text-xl font-semibold text-black">Location</h2>
            <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-2">
                <div>
                    <label className="mb-1 block text-sm font-medium">Street</label>
                    <input
                        type="text"
                        value={formData?.street || store.street}
                        onChange={e => (onFieldChange || (() => {
                        }))('street', e.target.value)}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Number</label>
                    <input
                        type="text"
                        value={formData?.number || store.number}
                        onChange={e => (onFieldChange || (() => {
                        }))('number', e.target.value)}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Postal Code</label>
                    <input
                        type="text"
                        value={formData?.postalCode || store.postalCode}
                        onChange={e => (onFieldChange || (() => {
                        }))('postalCode', e.target.value)}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Country</label>
                    <input
                        type="text"
                        value={formData?.country || store.country}
                        onChange={e => (onFieldChange || (() => {
                        }))('country', e.target.value)}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                        readOnly={readOnly}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">City</label>
                    <input
                        type="text"
                        value={formData?.city || store.city}
                        onChange={e => (onFieldChange || (() => {
                        }))('city', e.target.value)}
                        className="w-full rounded border px-3 py-1.5 text-sm"
                        readOnly={readOnly}
                    />
                </div>
            </div>
        </div>
    );
}