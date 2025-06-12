import React, {useCallback, useEffect, useState} from 'react';
import 'react-time-picker/dist/TimePicker.css';

interface DayDetailProps {
    id:number;
    openingAt: string;
    closingAt: string;
    openingAtAfterNoon?: string | null;
    closingAtAfterNoon?: string | null;
    day: string;
    onChange?: (openingAt: string, closingAt: string, openingAtAfterNoon?: string | null, closingAtAfterNoon?: string | null) => void;
    readOnly?: boolean;
}

// Helper to prepare time string props for internal state (converts "Closed" to null)
// This function is robust and correct for transforming backend 'Closed' to empty string for inputs.
const transformTimePropForInput = (timeString: string | null | undefined): string => {
    if (!timeString || timeString === 'Closed') {
        return ''; // HTML time input expects an empty string for no value
    }
    return timeString; // Time input can directly use "HH:mm" string
};

export function EditOpeningHour({
    id,
                                    openingAt, // e.g., "09:00" or "Closed"
                                    closingAt, // e.g., "17:00" or "Closed"
                                    openingAtAfterNoon = null,
                                    closingAtAfterNoon = null,
                                    day,
                                    onChange = () => { /* noop */ },
                                    readOnly,
                                }: DayDetailProps) {

    // Determine initial 'isClosed' directly from props.
    // This will be true if backend sends 'Closed' for either main time.
    const initialIsClosedState = openingAt === 'Closed' || closingAt === 'Closed';
    const initialIsBreakTimeState = !!openingAtAfterNoon && openingAtAfterNoon !== 'Closed' && !!closingAtAfterNoon && closingAtAfterNoon !== 'Closed';


    // State for managing if break time is enabled
    const [isBreakTime, setIsBreakTime] = useState(initialIsBreakTimeState);
    // State for managing if the entire day is closed
    const [isClosed, setIsClosed] = useState(initialIsClosedState);

    // State to hold the time values as "HH:mm" strings or null.
    // Initialize carefully: if initially closed, these should be empty strings.
    const [formValues, setFormValues] = useState(() => {
        if (initialIsClosedState) {
            return {
                openingAt: '',
                closingAt: '',
                openingAtAfterNoon: '',
                closingAtAfterNoon: '',
            };
        } else {
            return {
                openingAt: transformTimePropForInput(openingAt),
                closingAt: transformTimePropForInput(closingAt),
                openingAtAfterNoon: transformTimePropForInput(openingAtAfterNoon),
                closingAtAfterNoon: transformTimePropForInput(closingAtAfterNoon),
            };
        }
    });

    // Effect to re-synchronize internal states (isClosed, isBreakTime, formValues)
    // when the *props themselves* change. This is critical for controlled components.
    useEffect(() => {
        const newIsClosed = openingAt === 'Closed' || closingAt === 'Closed';
        setIsClosed(newIsClosed);

        const newIsBreakTime = !!openingAtAfterNoon && openingAtAfterNoon !== 'Closed' && !!closingAtAfterNoon && closingAtAfterNoon !== 'Closed';
        setIsBreakTime(newIsBreakTime);

        setFormValues(currentFormValues => {
            const transformedOpening = transformTimePropForInput(openingAt);
            const transformedClosing = transformTimePropForInput(closingAt);
            const transformedOpeningAfterNoon = transformTimePropForInput(openingAtAfterNoon);
            const transformedClosingAfterNoon = transformTimePropForInput(closingAtAfterNoon);

            if (newIsClosed) {
                // If now closed, ensure form values are empty for the inputs.
                if (currentFormValues.openingAt !== '' || currentFormValues.closingAt !== '' ||
                    currentFormValues.openingAtAfterNoon !== '' || currentFormValues.closingAtAfterNoon !== '') {
                    return { openingAt: '', closingAt: '', openingAtAfterNoon: '', closingAtAfterNoon: '' };
                }
            } else {
                // If not closed, ensure form values match the transformed props.
                if (currentFormValues.openingAt !== transformedOpening ||
                    currentFormValues.closingAt !== transformedClosing ||
                    currentFormValues.openingAtAfterNoon !== transformedOpeningAfterNoon ||
                    currentFormValues.closingAtAfterNoon !== transformedClosingAfterNoon) {
                    return {
                        openingAt: transformedOpening,
                        closingAt: transformedClosing,
                        openingAtAfterNoon: transformedOpeningAfterNoon,
                        closingAtAfterNoon: transformedClosingAfterNoon,
                    };
                }
            }
            return currentFormValues; // No change needed
        });

        // If the day is now closed, disable break time.
        if (newIsClosed) {
            setIsBreakTime(false);
        }

    }, [openingAt, closingAt, openingAtAfterNoon, closingAtAfterNoon]);

    useEffect(() => {
        console.log('EditOpeningHour.tsx - useEffect (onChange) triggered for day:', day);
        onChange( // <-- NOW PASS ID AND DAY
            id, // Pass its own ID
            day, // Pass its own day
            isClosed ? 'Closed' : (formValues.openingAt || 'Closed'),
            isClosed ? 'Closed' : (formValues.closingAt || 'Closed'),
            (isClosed || !isBreakTime) ? null : (formValues.openingAtAfterNoon || null),
            (isClosed || !isBreakTime) ? null : (formValues.closingAtAfterNoon || null)
        );
    }, [formValues, isClosed, isBreakTime, id, day, onChange]); // <-- ADD id, day to dependencies!



    // Handler for toggling the "Closed" state for the entire day
    const handleToggleClosed = useCallback(() => {
        const newState = !isClosed;
        setIsClosed(newState); // Update the local state immediately

        if (newState) { // If now truly closed
            setFormValues({
                openingAt: '', // Correctly set to empty string for HTML time input when closed
                closingAt: '',
                openingAtAfterNoon: '',
                closingAtAfterNoon: '',
            });
            setIsBreakTime(false); // Also disable break time if main hours are closed
        } else { // If toggling back to open
            // Provide default open times or revert to initial props if they were valid
            setFormValues({
                openingAt: transformTimePropForInput(openingAt !== 'Closed' ? openingAt : "09:00"),
                closingAt: transformTimePropForInput(closingAt !== 'Closed' ? closingAt : "17:00"),
                openingAtAfterNoon: '', // Don't automatically enable break time
                closingAtAfterNoon: '',
            });
        }
    }, [isClosed, openingAt, closingAt]); // Keep original props in dependency for potential re-initialization


    // Generic handler for time input changes, updates specific form field
    const handleTimeChange = useCallback((field: keyof typeof formValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues(prev => ({
            ...prev,
            [field]: e.target.value, // Value is already in "HH:mm" format
        }));
    }, []);

    // Handler for toggling the "Break Time" state
    const handleBreakTimeToggle = useCallback(() => {
        const newBreakTimeState = !isBreakTime;
        setIsBreakTime(newBreakTimeState);

        if (!newBreakTimeState) { // If turning break time OFF
            setFormValues(prev => ({
                ...prev,
                openingAtAfterNoon: '',
                closingAtAfterNoon: '',
            }));
        } else { // If turning break time ON
            // Initialize with default break times if they are currently empty
            setFormValues(prev => ({
                ...prev,
                openingAtAfterNoon: prev.openingAtAfterNoon || "12:00",
                closingAtAfterNoon: prev.closingAtAfterNoon || "13:00",
            }));
        }
    }, [isBreakTime]);

    return (
        <tr className="border-t border-gray-300">
            {/* Checkbox for Break Time */}
            {!readOnly && (
                <td className="px-4 py-2 text-center">
                    <input
                        type="checkbox"
                        checked={isBreakTime}
                        onChange={handleBreakTimeToggle}
                        className="cursor-pointer form-checkbox h-5 w-5 text-indigo-600 rounded-md focus:ring-indigo-500"
                        disabled={readOnly || isClosed} // Disable break time if main hours are closed
                    />
                </td>
            )}

            {/* Day Name */}
            <td className="px-4 py-2 font-medium text-gray-800">{day}</td>

            {/* Morning Opening Time */}
            <td className="px-4 py-2 text-gray-700">
                {!isClosed ? (
                    <>
                        <input
                            type="time"
                            value={formValues.openingAt}
                            onChange={handleTimeChange('openingAt')}
                            disabled={readOnly}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                        />
                    </>
                ) : (
                    <span className="text-gray-400 italic">Closed</span>
                )}
            </td>

            {/* Morning Closing Time */}
            <td className="px-4 py-2 text-gray-700">
                {!isClosed ? (
                    <input
                        type="time"
                        value={formValues.closingAt}
                        onChange={handleTimeChange('closingAt')}
                        disabled={readOnly}
                        className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                    />
                ) : (
                    <span className="text-gray-400 italic">Closed</span>
                )}
            </td>

            {/* Afternoon Opening Time (Break time active or not) */}
            {!isClosed && isBreakTime ? (
                <>
                    <td className="px-4 py-2 text-gray-700">
                        <input
                            type="time"
                            value={formValues.openingAtAfterNoon}
                            onChange={handleTimeChange('openingAtAfterNoon')}
                            disabled={readOnly || !isBreakTime}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                        />
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                        <input
                            type="time"
                            value={formValues.closingAtAfterNoon}
                            onChange={handleTimeChange('closingAtAfterNoon')}
                            disabled={readOnly || !isBreakTime}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm"
                        />
                    </td>
                </>
            ) : (
                <>
                    <td className="px-4 py-2">
                        <span className="text-gray-400 italic">{isClosed ? 'Closed' : 'No Break'}</span>
                    </td>
                    <td className="px-4 py-2">
                        <span className="text-gray-400 italic">{isClosed ? 'Closed' : 'No Break'}</span>
                    </td>
                </>
            )}

            {/* Checkbox for Day Closed */}
            {!readOnly && (
                <td className="px-4 py-2 text-center">
                    <input
                        type="checkbox"
                        checked={isClosed}
                        onChange={handleToggleClosed}
                        className="cursor-pointer form-checkbox h-5 w-5 text-red-600 rounded-md focus:ring-red-500"
                        disabled={readOnly}
                    />
                </td>
            )}
        </tr>
    );
}