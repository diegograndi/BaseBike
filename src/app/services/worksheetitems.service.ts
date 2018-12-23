import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { Worksheet } from '../models/worksheet';
@Injectable({
  providedIn: 'root'
})
export class WorksheetitemsService {

  constructor(private http: HttpClient) { }

  list(wshid: Worksheet) {
    return this.http.get<Item[]>('https://localhost:5001/bbapi/v1/worksheets/items/list/' + wshid);
  }

  detail(wshitmId: Item) {
    return this.http.get<Item>('https://localhost:5001/bbapi/v1/worksheets/items/detail/' + wshitmId );
  }

  delete(wshitmId: Item) {
    return this.http.get<Item>('https://localhost:5001/bbapi/v1/worksheets/items/delete/' + wshitmId );
  }
}
