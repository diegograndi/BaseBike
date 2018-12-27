import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<User[]>('https://localhost:5001/bbapi/v1/users/list');
  }

  detail(usrId: User) {
    return this.http.get<User>('https://localhost:5001/bbapi/v1/users/detail/' + usrId );
  }

  search(search: string) {
    return this.http.get<User[]>('https://localhost:5001/bbapi/v1/users/list/' + search);
  }

}
