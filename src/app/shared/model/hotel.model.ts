import { HotelMedia } from './hotel-media.model';

export class Hotel {
    id: number;
    name: string;
    city: string;
    street: string;
    phone: number;
    email: string;
    description: string;
    singleRoom : number;
    doubleRoom : number;
    tripleRoom : number;
    breakfastIncluded : number;
    hotelMedias: HotelMedia[];
}