import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';
import { Worksheet } from '../models/worksheet';
@Injectable({
  providedIn: 'root'
})
export class WorksheetitemsService {

  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;application/x-www-form-urlencoded'
      })
    };
   }

  list(wshid: Worksheet) {
    return this.http.get<Item[]>('https://localhost:5001/bbapi/v1/worksheets/items/list/' + wshid);
  }

  detail(wshitmId: Item) {
    return this.http.get<Item>('https://localhost:5001/bbapi/v1/worksheets/items/detail/' + wshitmId );
  }

  delete(wshitmId: Item) {

    return this.http.delete<Item>('https://localhost:5001/bbapi/v1/worksheets/items/delete/' + wshitmId.worksheetItemID , this.httpOptions);
  }

  update(wshitmId: Item) {
    return this.http.post<Item>('https://localhost:5001/bbapi/v1/worksheets/items/update/', wshitmId , this.httpOptions);
  }

  insert(wshitmId: Item) {
    return this.http.put<Item>('https://localhost:5001/bbapi/v1/worksheets/items/insert/', wshitmId , this.httpOptions);
  }

}
