import { Observable, of } from 'rxjs';
import { Booker } from '../model/Booker.model';

export abstract class IBookerService {
    public abstract getAllBookers(): Observable<Booker[]>;
    public abstract getBookerById(id: number): Observable<Booker>;
    public abstract saveBooker (booker: Booker): Observable<Booker>;
    public abstract updateBooker (booker: Booker, id: number): Observable<Booker>;
    public abstract deleteBookerById (id: number): Observable<any>;
}
