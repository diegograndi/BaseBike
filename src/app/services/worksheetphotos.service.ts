import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../models/photo';
import { Worksheet } from '../models/worksheet';
@Injectable({
  providedIn: 'root'
})
export class WorksheetphotosService {

  constructor(private http: HttpClient) { }

  list(wshid: Worksheet) {
    return this.http.get<Photo[]>('https://localhost:5001/bbapi/v1/worksheets/photos/list/' + wshid);
  }

  detail(wshphtId: Photo) {
    return this.http.get<Photo>('https://localhost:5001/bbapi/v1/worksheets/photos/detail/' + wshphtId );
  }
}
