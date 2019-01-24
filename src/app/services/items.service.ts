import { Injectable, Output, EventEmitter  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private httpOptions;

  @Output() changeItemsCount: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;application/x-www-form-urlencoded'
      })
    };
   }

  list() {
    return this.http.get<Item[]>(environment.apiUrl + 'items/list');
  }

  detail(itmId: Item) {
    return this.http.get<Item>(environment.apiUrl + 'tems/detail/' + itmId );
  }

  search(search: string) {
    return this.http.get<Item[]>(environment.apiUrl + 'items/list/' + search);
  }

  insert(itmId: Item) {
    return this.http.put<Item>(environment.apiUrl + 'items/insert/', itmId, this.httpOptions);
  }

  delete(itmId: Item) {
    return this.http.delete<Item>(environment.apiUrl + 'items/delete/' + itmId.itemID ,
    this.httpOptions);
  }

  update(itmId: Item) {
    return this.http.post<Item>('https://localhost:5001/bbapi/v1/items/update/', itmId, this.httpOptions);
  }

  notifyItemsCount(cnt: number) {
    this.changeItemsCount.emit(cnt);
   }

}
