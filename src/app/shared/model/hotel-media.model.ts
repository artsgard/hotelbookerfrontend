import { Hotel } from './hotel.model';

export class HotelMedia {
    id: number;
    title: string;
    link: string;
    description: string;
    hotel: Hotel;
    tempFileName: string;
    tempDirName: string;
}