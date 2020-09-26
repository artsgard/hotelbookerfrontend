import { Observable } from "rxjs";
import { HttpHeaders } from '@angular/common/http';

export abstract class IHeaderPropService {
    public abstract setHeaderProp(clientname: string, password: string): void;
    public abstract getHeaderProp(): HttpHeaders;
    public abstract changeClientName(clientName: string): void
}