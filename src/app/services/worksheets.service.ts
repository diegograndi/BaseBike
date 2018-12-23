import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worksheet } from '../models/worksheet';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorksheetsService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Worksheet[]>('https://localhost:5001/bbapi/v1/worksheets/list/');
  }

  detail(wshId: Worksheet) {
    return this.http.get<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/detail/' + wshId );
  }

  insert(wshId: Worksheet) {
    return this.http.get<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/insert/' + wshId );
  }

  update(wshId: Worksheet) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;application/x-www-form-urlencoded'
      })
    };

    return this.http.post<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/update/',  wshId , httpOptions);
  }

}
