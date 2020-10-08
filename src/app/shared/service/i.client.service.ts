import { Observable, of } from 'rxjs';
import { Client } from '../model/client.model';

export abstract class IClientService {
    public abstract getAllClients(): Observable<Client[]>;
    public abstract getClientById(id: number): Observable<Client>;
    public abstract getClientByUsername(userName: string): Observable<Client>;
    public abstract saveClient (client: Client): Observable<Client>;
    public abstract updateClient (client: Client): Observable<Client>;
    public abstract deleteClientById (id: number): Observable<any>;
    public abstract getClient(): Observable<Client>;
    public abstract setClient(client: Client): void;
}
