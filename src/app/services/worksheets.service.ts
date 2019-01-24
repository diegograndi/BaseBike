import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worksheet } from '../models/worksheet';
import { User} from '../models/user';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorksheetsService {

  private httpOptions;

  @Output() changeWorksheetsCount: EventEmitter<number> = new EventEmitter();
  @Output() changeOpenWorksheetsCount: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;',
        'Accept': 'application/json;'
      })
    };
  }
  list(srch: string) {
    return this.http.get<Worksheet[]>(environment.apiUrl + 'worksheets/list/' + srch);
  }
  listByUser(usrid: User) {
    return this.http.get<Worksheet[]>(environment.apiUrl + 'worksheets/listbyuser/' + usrid);
  }

  detail(wshId: Worksheet) {
    return this.http.get<Worksheet>(environment.apiUrl + 'worksheets/detail/' + wshId );
  }

  insert(wshId: Worksheet) {
    return this.http.put<Worksheet>(environment.apiUrl + 'worksheets/insert/', wshId, this.httpOptions);
  }

  delete(wshId: Worksheet) {
    return this.http.delete<Worksheet>(environment.apiUrl + 'worksheets/delete/' + wshId.worksheetID ,
    this.httpOptions);
  }

  update(wshId: Worksheet) {
    return this.http.post<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/update/',  wshId , this.httpOptions);
  }

 notifyWorksheetsCount(cnt: number) {
  this.changeOpenWorksheetsCount.emit(cnt);
 }

 notifyOpenWorksheetsCount(cnt: number) {
  this.changeWorksheetsCount.emit(cnt);
 }

}
