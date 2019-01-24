import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../models/item';
import { Worksheet } from '../models/worksheet';
import { environment } from '../../environments/environment';

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
    return this.http.get<Item[]>(environment.apiUrl + 'worksheets/items/list/' + wshid);
  }

  detail(wshitmId: Item) {
    return this.http.get<Item>(environment.apiUrl + 'worksheets/items/detail/' + wshitmId );
  }

  delete(wshitmId: Item) {

    return this.http.delete<Item>(environment.apiUrl + 'worksheets/items/delete/' + wshitmId.worksheetItemID , this.httpOptions);
  }

  update(wshitmId: Item) {
    return this.http.post<Item>(environment.apiUrl + 'worksheets/items/update/', wshitmId , this.httpOptions);
  }

  insert(wshitmId: Item) {
    return this.http.put<Item>(environment.apiUrl + 'worksheets/items/insert/', wshitmId , this.httpOptions);
  }

}
