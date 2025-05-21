interface DayDetailProps {
  openingAt: string;
  closingAt: string;
  day: string;
}

export default function DayDetail({ openingAt, closingAt, day }: DayDetailProps) {
  const isClosed = openingAt === 'closed' || closingAt === 'closed';

  return (
    <li>
      <span className="font-medium">{day}:</span>{' '}
      {isClosed ? 'Closed' : `${openingAt} - ${closingAt}`}
    </li>
  );
}
