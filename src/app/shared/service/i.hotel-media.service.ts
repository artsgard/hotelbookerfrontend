import { Observable, of } from 'rxjs';
import { HotelMedia } from '../model/hotel-media.model';

export abstract class IHotelMediaService {
    public abstract getAllHotelMedias(): Observable<HotelMedia[]>;
    public abstract getHotelMediaById(id: number): Observable<HotelMedia>;
    public abstract saveHotelMedia (hotelMedia: HotelMedia): Observable<HotelMedia>;
    public abstract updateHotelMedia (hotelMedia: HotelMedia): Observable<HotelMedia>;
    public abstract deleteHotelMediaById (id: number): Observable<any>;
}
