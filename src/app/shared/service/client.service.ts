import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { catchError, map, tap, publishReplay, refCount } from 'rxjs/operators';
import { Client } from '../model/client.model';
import { IClientService } from './i.client.service';
import { Router } from '@angular/router';
import { endpoints } from './endpoints';
import { LiteralMapEntry } from '@angular/compiler/src/output/output_ast';

const { clientUrl } = endpoints;

@Injectable({ providedIn: 'root' })
export class ClientService implements IClientService {

  public currentClient: Client;
  public clientBehaviorSubject: BehaviorSubject<Client>;

  constructor(private http: HttpClient, public router: Router) { 
    this.clientBehaviorSubject = new BehaviorSubject<Client>(this.currentClient);
  }

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
      //tap(data => this.currentClientSubject.next(data)),
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  /** PUT: update the Client on the server */
  public updateClient(client: Client): Observable<Client> {
    const url = `${clientUrl}`;
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

  public setClient(client: Client): void  {
    this.clientBehaviorSubject.next(client);
  }

  public getClient(): Observable<Client>  {
    return this.clientBehaviorSubject;
  }
}