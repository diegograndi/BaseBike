import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  '123'
      })
    };
   }

  detail(actId: Account) {
    return this.http.get<Account>(environment.apiUrl + 'account/detail/', this.httpOptions);
  }
}
