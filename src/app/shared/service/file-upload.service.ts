import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { endpoints } from './endpoints';
import { FileLoadInfoModel } from '../model/file-load-info.model';
import { catchError, map, tap, publishReplay, refCount } from 'rxjs/operators';

const { fileUploadUrl } = endpoints;
const { fileDownloadUrl } = endpoints;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  private uploadInfo: FileLoadInfoModel;

  constructor(private http: HttpClient) { }
  
  public upload2(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', fileUploadUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  public upload(file: File): Observable<FileLoadInfoModel> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileLoadInfoModel>(fileUploadUrl, formData).pipe(
      tap(data => this.uploadInfo = data),
     
      catchError(err => {
        console.log('An Error occured when saving: ' + JSON.stringify(err));
        return of(null);
      })
    );
  }

  getFiles(): Observable<any> {
    return this.http.get(fileDownloadUrl);
  }
}