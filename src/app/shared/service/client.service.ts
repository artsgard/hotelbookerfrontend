import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, publishReplay, refCount } from 'rxjs/operators';
import { Client } from '../model/client.model';
import { IClientService } from './i.client.service';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';

const { clientUrl } = endpoints;

@Injectable({ providedIn: 'root' })
export class ClientService implements IClientService {
  private currentClient: Client;

  constructor(private http: HttpClient, public router: Router) { }

  /** GET Client by Clientname. Will 404 if id not found */
  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(clientUrl)
      .pipe(
        catchError(err => {
          console.log('An Error occured when getting all clients: ' + JSON.stringify(err));
          return of(null);
        })
      );
  }

   /** GET Client by id. Will 404 if id not found */
  public getClientById(id: number): Observable<Client> {
    const url = `${clientUrl}/${id}`;
    return this.http.get<Client>(url).pipe(
      catchError(err => {
        console.log('An Error occured when getting client by id: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** GET Client by userName. Will 404 if id not found */
  public getClientByUsername(userName: string): Observable<Client> {
    const url = `${clientUrl}/byClientname/${userName}`;
    return this.http.get<Client>(url).pipe(
      catchError(err => {
        console.log('An Error occured when getting client by username: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** POST: save a new Client to the server */
  public saveClient(client: Client): Observable<Client> {
    return this.http.post<Client>(clientUrl, client).pipe(
      tap(data => this.currentClient = data),
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** PUT: update the Client on the server */
  public updateClient(client: Client, id: number): Observable<Client> {
    const url = `${clientUrl}/${id}`;
    return this.http.put(url, client).pipe(
      catchError(err => {
        console.log('An Error occured when updating: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** DELETE: delete the Client from the server by id */
  public deleteClientById(id: number): Observable<any> {
    const url = `${clientUrl}/${id}`;
    return this.http.delete<Client>(url).pipe(
      catchError(err => {
        console.log('An Error occured when deleting: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  public getClient():  Observable<Client>  {
    return of(this.currentClient);
  }
}