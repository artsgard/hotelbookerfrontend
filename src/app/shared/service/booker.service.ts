import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, publishReplay, refCount } from 'rxjs/operators';
import { Booker } from '../model/booker.model';
import { IBookerService } from './i.booker.service';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

const { bookerUrl } = endpoints;

@Injectable({ providedIn: 'root' })
export class BookerService implements IBookerService {

  private currentBooker: Booker;

  constructor(private http: HttpClient, public router: Router) { }

  /** GET Booker by Bookername. Will 404 if id not found */
  public getAllBookers(): Observable<Booker[]> {
    return this.http.get<Booker[]>(bookerUrl)
      .pipe(
        catchError(err => {
          console.log('An Error occured when getting all Bookers: ' + JSON.stringify(err));
          return of(null);
        })
      );
  }

   /** GET Booker by id. Will 404 if id not found */
  public getBookerById(id: number): Observable<Booker> {
    const url = `${bookerUrl}/${id}`;
    return this.http.get<Booker>(url).pipe(
      catchError(err => {
        console.log('An Error occured when getting Booker by id: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** POST: save a new Booker to the server */
  public saveBooker(booker: Booker): Observable<Booker> {
    return this.http.post<Booker>(bookerUrl, booker).pipe(
      tap(data => this.currentBooker = data),
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** PUT: update the Booker on the server */
  public updateBooker(booker: Booker, id: number): Observable<Booker> {
    const url = `${bookerUrl}/${id}`;
    return this.http.put(url, booker).pipe(
      catchError(err => {
        console.log('An Error occured when updating: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** DELETE: delete the Booker from the server by id */
  public deleteBookerById(id: number): Observable<any> {
    const url = `${bookerUrl}/${id}`;
    return this.http.delete<Booker>(url).pipe(
      catchError(err => {
        console.log('An Error occured when deleting: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  public getCurrentBooker(): Booker {
    return this.currentBooker;
  }
}