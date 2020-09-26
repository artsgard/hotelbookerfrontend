import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHeaderPropService } from './i.header-prop.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderPropService implements IHeaderPropService {

    private headers: HttpHeaders;
    private password: string;

    constructor() { }

    public setHeaderProp(clientname: string, password: string): void {
        this.password = password;
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
            .append("Authorization", "Basic " + btoa(clientname + ":" + password))
    };

    public getHeaderProp(): HttpHeaders {
        return  this.headers
    }

    public changeClientName(clientName: string): void {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' })
            .append("Authorization", "Basic " + btoa(clientName + ":" + this.password))
    };

}