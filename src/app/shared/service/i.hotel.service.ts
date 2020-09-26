import { Observable, of } from 'rxjs';
import { Hotel } from '../model/hotel.model';

export abstract class IHotelService {
    public abstract getAllHotels(): Observable<Hotel[]>;
    public abstract getHotelById(id: number): Observable<Hotel>;
    public abstract saveHotel (hotel: Hotel): Observable<Hotel>;
    public abstract updateHotel (hotel: Hotel, id: number): Observable<Hotel>;
    public abstract deleteHotelById (id: number): Observable<any>;

}
