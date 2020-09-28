import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Hotel } from '../model/hotel.model';
import { IHotelService } from './i.hotel.service';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

const { hotelUrl } = endpoints;

@Injectable({ providedIn: 'root' })
export class HotelService implements IHotelService {

  constructor(private http: HttpClient, public router: Router) { }

  /** GET Hotel by Hotelname. Will 404 if id not found */
  public getAllHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(hotelUrl)
      .pipe(
        catchError(err => {
          console.log('An Error occured when getting all Hotels: ' + JSON.stringify(err));
          return of(null);
        })
      );
  }

   /** GET Hotel by id. Will 404 if id not found */
  public getHotelById(id: number): Observable<Hotel> {
    const url = `${hotelUrl}/${id}`;
    return this.http.get<Hotel>(url).pipe(
      catchError(err => {
        console.log('An Error occured when getting Hotel by id: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** POST: save a new Hotel to the server */
  public saveHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(hotelUrl, hotel).pipe(
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** PUT: update the Hotel on the server */
  public updateHotel(hotel: Hotel, id: number): Observable<Hotel> {
    const url = `${hotelUrl}/${id}`;
    return this.http.put(url, hotel).pipe(
      catchError(err => {
        console.log('An Error occured when updating: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** DELETE: delete the Hotel from the server by id */
  public deleteHotelById(id: number): Observable<any> {
    const url = `${hotelUrl}/${id}`;
    return this.http.delete<Hotel>(url).pipe(
      catchError(err => {
        console.log('An Error occured when deleting: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }
}