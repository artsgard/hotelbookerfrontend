import { Client } from './client.model';
import { Hotel } from './hotel.model';

export class Booker {
    id: number;
    checkInDate: Date;
    checkOutDate: Date;
    roomType: string;
    breakfastIncluded: boolean = false;
    bookingDate : Date;
    nights : number;
    finalPrice : number;
    client : Client;
    hotel : Hotel;
}