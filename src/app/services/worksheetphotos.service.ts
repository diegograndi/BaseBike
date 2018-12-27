import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';
import { Worksheet } from '../models/worksheet';
@Injectable({
  providedIn: 'root'
})
export class WorksheetphotosService {

  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;application/x-www-form-urlencoded'
      })
    };
   }

  list(wshid: Worksheet) {
    return this.http.get<Photo[]>('https://localhost:5001/bbapi/v1/worksheets/photos/list/' + wshid);
  }

  detail(wshphtId: Photo) {
    return this.http.get<Photo>('https://localhost:5001/bbapi/v1/worksheets/photos/detail/' + wshphtId );
  }

  delete(wshphtId: Photo) {

    return this.http.delete<Photo>('https://localhost:5001/bbapi/v1/worksheets/photos/delete/' + wshphtId.photoID ,
    this.httpOptions);
  }
}
