interface TimeInputProps {
    time: string;
    isClosed: boolean;
    onChange: (time: string) => void;
}

export default function TimeInput({time, isClosed, onChange}: TimeInputProps) {
    return isClosed ? <span>Closed</span> :
        <input value={time} onChange={(e) => {
            onChange(e.target.value)
        }} type="time"/>
}