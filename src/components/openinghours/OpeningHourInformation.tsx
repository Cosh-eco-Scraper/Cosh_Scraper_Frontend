import { OpeningHour } from '@/domain/OpeningHour';
import OpeningDetail from '@/components/openinghours/OpeningDetail';

interface OpeningHourInformationProps {
  openingHours?: OpeningHour[];
}

export default function OpeningHourInformation({ openingHours }: OpeningHourInformationProps) {
  return (
    <table>
      <thead className={'inter-medium'}>
        <tr>
          <th className={'pb-4 text-left'}>Day</th>
          <th className="pr-4 pb-4 text-right">Morning hours</th>
          <th className="pr-4 pb-4 text-right">Afternoon hours</th>
        </tr>
      </thead>
      <tbody className="pt-4">
        {openingHours &&
          [...openingHours]
            .sort((a, b) => {
              const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ];
              return days.indexOf(a.day) - days.indexOf(b.day);
            })
            .map(hour => <OpeningDetail key={hour.id} openingHour={hour} />)}
      </tbody>
    </table>
  );
}
