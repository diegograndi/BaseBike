import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Worksheet } from '../models/worksheet';
import { User} from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorksheetsService {

  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;',
        'Accept': 'application/json;'
      })
    };
  }
  list(srch: string) {
    return this.http.get<Worksheet[]>('https://localhost:5001/bbapi/v1/worksheets/list/' + srch);
  }
  listByUser(usrid: User) {
    return this.http.get<Worksheet[]>('https://localhost:5001/bbapi/v1/worksheets/listbyuser/' + usrid);
  }

  detail(wshId: Worksheet) {
    return this.http.get<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/detail/' + wshId );
  }

  insert(wshId: Worksheet) {
    return this.http.put<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/insert/', wshId, this.httpOptions);
  }

  delete(wshId: Worksheet) {
    return this.http.delete<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/delete/' + wshId.worksheetID ,
    this.httpOptions);
  }

  update(wshId: Worksheet) {
    return this.http.post<Worksheet>('https://localhost:5001/bbapi/v1/worksheets/update/',  wshId , this.httpOptions);
  }

}
