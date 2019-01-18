import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOptions;

  @Output() changeUsersCount: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json;application/x-www-form-urlencoded'
      })
    };
   }

  list() {
    return this.http.get<User[]>('https://localhost:5001/bbapi/v1/users/list');
  }

  detail(usrId: User) {
    return this.http.get<User>('https://localhost:5001/bbapi/v1/users/detail/' + usrId );
  }

  search(search: string) {
    return this.http.get<User[]>('https://localhost:5001/bbapi/v1/users/list/' + search);
  }

  insert(usrId: User) {
    return this.http.put<User>('https://localhost:5001/bbapi/v1/users/insert/', usrId, this.httpOptions);
  }

  delete(usrId: User) {
    return this.http.delete<User>('https://localhost:5001/bbapi/v1/users/delete/' + usrId.userID ,
    this.httpOptions);
  }

  update(usrId: User) {
    return this.http.post<User>('https://localhost:5001/bbapi/v1/users/update/', usrId, this.httpOptions);
  }

  notifyUsersCount(cnt: number) {
    this.changeUsersCount.emit(cnt);
   }

}
