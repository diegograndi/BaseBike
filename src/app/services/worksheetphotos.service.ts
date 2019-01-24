import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../models/photo';
import { Worksheet } from '../models/worksheet';
import { environment } from '../../environments/environment';

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
    return this.http.get<Photo[]>(environment.apiUrl + 'worksheets/photos/list/' + wshid);
  }

  detail(wshphtId: Photo) {
    return this.http.get<Photo>(environment.apiUrl + 'worksheets/photos/detail/' + wshphtId );
  }

  delete(wshphtId: Photo) {

    return this.http.delete<Photo>(environment.apiUrl + 'worksheets/photos/delete/' + wshphtId.photoID ,
    this.httpOptions);
  }

  upload(phtData: FormData, fname: string) {

    return this.http.post(environment.apiUrl + 'worksheets/photos/upload/' + fname , phtData);
  }

  insert(wshphtId: Photo) {
    return this.http.put<Photo>(environment.apiUrl + 'worksheets/photos/insert/', wshphtId , this.httpOptions);
  }
}
