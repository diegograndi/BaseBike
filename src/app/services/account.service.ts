import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  detail(actId: Account) {
    return this.http.get<Account>('https://localhost:5001/bbapi/v1/account/detail/');
  }
}
