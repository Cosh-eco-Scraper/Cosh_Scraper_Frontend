import OpeningDetail from "@/components/openinghours/OpeningDetail";
import {OpeningHour} from "@/domain/OpeningHour";

interface OpeningHourInformationProps {
    openingHours?: OpeningHour[];
}

export default function OpeningHourInformation({openingHours}: OpeningHourInformationProps) {
    return (
        <table>
            <thead className={"inter-medium"}>
            <tr>
                <th className={"text-left pb-4"}>Day</th>
                <th className="text-right pr-4 pb-4">Morning hours</th>
                <th className="text-right pr-4 pb-4">Afternoon hours</th>
            </tr>
            </thead>
            <tbody className="pt-4">
            {openingHours?.map(hour => <OpeningDetail key={hour.id} openingHour={hour}/>)}
            </tbody>
        </table>
    )
}