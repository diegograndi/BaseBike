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
        'Content-Type':  'application/json;'
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

  upload(phtData: FormData, fname: string) {

    return this.http.post('https://localhost:5001/bbapi/v1/worksheets/photos/upload/' + fname , phtData);
  }

  insert(wshphtId: Photo) {
    return this.http.put<Photo>('https://localhost:5001/bbapi/v1/worksheets/photos/insert/', wshphtId , this.httpOptions);
  }
}
