import React from 'react';

interface DayDetailProps {
    openingAt: string;
    closingAt: string;
    day: string;
    onChange?: (openingAt: string, closingAt: string) => void;
    readOnly?: boolean;
}

export default function DayDetail({
                                      openingAt, closingAt, day, onChange = () => {
    }, readOnly
                                  }: DayDetailProps) {
    const isClosed = openingAt === 'closed' || closingAt === 'closed';

    const handleToggleClosed = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        if (checked) {
            onChange('closed', 'closed');
        } else {
            onChange('09:00', '17:00');
        }
    };

    const handleOpeningChange = (value: string) => {
        onChange(value, closingAt);
    };

    const handleClosingChange = (value: string) => {
        onChange(openingAt, value);
    };

    return (
        <tr className="border-t border-gray-300">
            <td className="px-4 py-2 font-medium text-black">{day}</td>

            <td className="px-4 py-2">
                {!isClosed ? (
                    <input
                        type="time"
                        value={openingAt}
                        onChange={e => handleOpeningChange(e.target.value)}
                        className="w-full rounded border px-2 py-1 text-sm text-black"
                        min="00:00"
                        max="23:59"
                        readOnly={readOnly}
                    />
                ) : (
                    <span className="text-gray-400 italic">Closed</span>
                )}
            </td>

            <td className="px-4 py-2">
                {!isClosed ? (
                    <input
                        type="time"
                        value={closingAt}
                        onChange={e => handleClosingChange(e.target.value)}
                        className="w-full rounded border px-2 py-1 text-sm text-black"
                        min="00:00"
                        max="23:59"
                        readOnly={readOnly}
                    />
                ) : (
                    <span className="text-gray-400 italic">Closed</span>
                )}
            </td>

            <td className="px-4 py-2 text-center">
                <input
                    type="checkbox"
                    checked={isClosed}
                    onChange={handleToggleClosed}
                    className="cursor-pointer"
                    readOnly={readOnly}
                    disabled={readOnly}
                />
            </td>
        </tr>
    );
}