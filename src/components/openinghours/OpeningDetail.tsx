import {OpeningHourDetail} from "@/domain/OpeningHour"; // Assuming this path is correct

export interface OpeningDetailProps {
    openingHour: OpeningHourDetail;
}

export default function OpeningDetail({openingHour}: OpeningDetailProps) {
    const {day, openingAt, closingAt, openingAtAfterNoon, closingAtAfterNoon} = openingHour;

    // Helper to format a 24-hour time string into { hour: 'HH:MM', time: 'AM/PM' }
    const formatTime = (time24h: string | undefined | null) => {
        if (!time24h) {
            return null; // Return null if no time is provided
        }

        const [hoursStr, minutesStr] = time24h.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (isNaN(hours) || isNaN(minutes)) {
            return null; // Handle invalid time strings
        }

        let formattedHour: string;
        let period: 'AM' | 'PM';

        if (hours === 0) {
            formattedHour = `12:${minutesStr}`;
            period = 'AM';
        } else if (hours > 12) {
            formattedHour = `${hours - 12}:${minutesStr}`;
            period = 'PM';
        } else if (hours === 12) {
            formattedHour = `12:${minutesStr}`;
            period = 'PM';
        } else {
            formattedHour = `${hours}:${minutesStr}`;
            period = 'AM';
        }

        // Ensure minutes are always two digits
        formattedHour = `${parseInt(formattedHour.split(':')[0], 10)}:${minutesStr.padStart(2, '0')}`;

        return {
            hour: formattedHour,
            time: period
        };
    };

    // Determine if the main period is closed
    const isMainPeriodClosed = openingAt?.toLowerCase() === 'closed' || closingAt?.toLowerCase() === 'closed';

    if (isMainPeriodClosed) {
        return (
            <tr>
                {/* Apply source-serif-pro-semi-bold and font-bold as defined in your global CSS or Tailwind config */}
                <td className="capitalize source-serif-pro-semi-bold font-bold">
                    {day}
                </td>
                <td className="capitalize source-serif-italic-text font-bold text-right pr-4">Closed</td>
                <td></td>
                {/* Empty cell for the afternoon slot to maintain table structure */}
            </tr>
        );
    }

    const formattedMorningOpening = formatTime(openingAt);
    const formattedMorningClosing = formatTime(closingAt);

    if (!formattedMorningOpening || !formattedMorningClosing) {
        return null; // Or render an error/placeholder
    }

    const formattedAfternoonOpening = formatTime(openingAtAfterNoon);
    const formattedAfternoonClosing = formatTime(closingAtAfterNoon);

    const hasAfternoonHours = formattedAfternoonOpening && formattedAfternoonClosing;

    return (
        <tr onClick={() => console.log(openingHour)}>
            <td className="capitalize source-serif-pro-semi-bold font-bold">
                {day}
            </td>
            <td className="font-inter-normal pr-4 text-right">
                {formattedMorningOpening.hour}{' '}
                <span className="font-source-serif-pro-semi-bold">
                    {formattedMorningOpening.time}
                </span>{' '}
                - {formattedMorningClosing.hour}{' '}
                <span className="font-source-serif-pro-semi-bold">
                    {formattedMorningClosing.time}
                </span>
            </td>

            {hasAfternoonHours ? (
                <td className="font-inter-normal pr-4 text-right">
                    {formattedAfternoonOpening.hour}{' '}
                    <span className="font-source-serif-pro-semi-bold">
                        {formattedAfternoonOpening.time}
                    </span>{' '}
                    - {formattedAfternoonClosing.hour}{' '}
                    <span className="font-source-serif-pro-semi-bold">
                        {formattedAfternoonClosing.time}
                    </span>
                </td>
            ) : (
                <td></td> // Empty cell if no afternoon hours, to maintain table structure
            )}
        </tr>
    );
}