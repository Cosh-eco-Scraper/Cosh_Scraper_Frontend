import OpeningDetail from '@/components/openinghours/OpeningDetail';
import { OpeningHour } from '@/domain/OpeningHour';

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
        {openingHours?.map(hour => <OpeningDetail key={hour.id} openingHour={hour} />)}
      </tbody>
    </table>
  );
}
