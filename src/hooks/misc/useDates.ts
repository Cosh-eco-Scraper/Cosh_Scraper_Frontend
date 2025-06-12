
// Helper hook for date/time utilities (can be in its own file or integrated)
export default function useDates() {
    const padZero = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    // Converts an "HH:mm" string to a Date object (today's date with given time)
    const dateStringToTime = (dateString: string | null): Date | null => {
        if (!dateString) {
            return null;
        }

        const parts = dateString.split(':');
        if (parts.length === 2) {
            const hours = parseInt(parts[0], 10);
            const minutes = parseInt(parts[1], 10);

            if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                const date = new Date();
                date.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds
                return date;
            }
        }
        console.warn(`dateStringToTime could not parse "${dateString}". Returning null.`);
        return null;
    };

    // Converts a Date object to an "HH:mm" string
    const timeToDateString = (date: Date | null): string | null => {
        if (!date) {
            return null;
        }
        const formattedHours = padZero(date.getHours());
        const formattedMinutes = padZero(date.getMinutes());
        return `${formattedHours}:${formattedMinutes}`;
    };

    return {
        dateStringToTime,
        timeToDateString,
    };
}