interface TimeInputProps {
  time: string;
  isClosed: boolean;
  onChange: (time: string) => void;
}

export default function TimeInput({ time, isClosed, onChange }: TimeInputProps) {
  return isClosed ? (
    <span className={'source-serif-pro-light'}>Closed</span>
  ) : (
    <input
      className={'source-serif-pro-normal'}
      value={time}
      onChange={e => {
        onChange(e.target.value);
      }}
      type="time"
    />
  );
}
