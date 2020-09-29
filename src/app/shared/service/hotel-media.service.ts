import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, publishReplay, refCount } from 'rxjs/operators';
import { HotelMedia } from '../model/hotel-media.model';
import { IHotelMediaService } from './i.hotel-media.service';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

const { hotelMediaUrl } = endpoints;

@Injectable({ providedIn: 'root' })
export class HotelMediaService implements IHotelMediaService {

  constructor(private http: HttpClient, public router: Router) { }

  /** GET HotelMedia by HotelMedianame. Will 404 if id not found */
  public getAllHotelMedias(): Observable<HotelMedia[]> {
    return this.http.get<HotelMedia[]>(hotelMediaUrl)
      .pipe(
        catchError(err => {
          console.log('An Error occured when getting all HotelMedias: ' + JSON.stringify(err));
          return of(null);
        })
      );
  }

   /** GET HotelMedia by id. Will 404 if id not found */
  public getHotelMediaById(id: number): Observable<HotelMedia> {
    const url = `${hotelMediaUrl}/${id}`;
    return this.http.get<HotelMedia>(url).pipe(
      catchError(err => {
        console.log('An Error occured when getting HotelMedia by id: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** POST: save a new HotelMedia to the server */
  public saveHotelMedia(hotelMedia: HotelMedia): Observable<HotelMedia> {
    return this.http.post<HotelMedia>(hotelMediaUrl, hotelMedia).pipe(
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** PUT: update the HotelMedia on the server */
  public updateHotelMedia(hotelMedia: HotelMedia): Observable<HotelMedia> {
    const url = `${hotelMediaUrl}`;
    return this.http.put(url, hotelMedia).pipe(
      catchError(err => {
        console.log('An Error occured when updating: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** DELETE: delete the HotelMedia from the server by id */
  public deleteHotelMediaById(id: number): Observable<any> {
    const url = `${hotelMediaUrl}/${id}`;
    return this.http.delete<HotelMedia>(url).pipe(
      catchError(err => {
        console.log('An Error occured when deleting: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }
}