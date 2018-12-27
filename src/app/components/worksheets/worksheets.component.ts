import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import { WorksheetitemsService} from '../../services/worksheetitems.service';
import { WorksheetphotosService} from '../../services/worksheetphotos.service';
import { AccountService} from '../../services/account.service';
import { UsersService} from '../../services/users.service';
import {Worksheet} from '../../models/worksheet';
import {User} from '../../models/user';
import {Account} from '../../models/account';
import { Guid } from 'guid-typescript';
import { Router} from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-worksheets',
  templateUrl: './worksheets.component.html',
  styleUrls: ['./worksheets.component.scss']
})
export class WorksheetsComponent implements OnInit {

  worksheets: Worksheet[];
  newWorksheet: Worksheet = {};
  userWorksheet: User = {};
  account: Account = {};
  users: User[];
  inputSearch: string;

  constructor(private wshSrv: WorksheetsService,
              private wshitmSrv: WorksheetitemsService,
              private wshphtSrv: WorksheetphotosService,
              private actSrv: AccountService,
              private usrSrv: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.actSrv.detail(this.account).subscribe(accounts => this.account = accounts);
    this.wshSrv.list().subscribe(result => this.worksheets = result);
  }

  WorksheetInsert() {
    if (this.newWorksheet.userID == null) {
        confirm('Selezionare un cliente');
      } else {
        if (confirm('Conferma nuova scheda?')) {
          this.newWorksheet.accountID = this.account[0].accountID;
          this.newWorksheet.worksheetID = Guid.create().toString();
          this.newWorksheet.worksheetType = 'Service';
          this.newWorksheet.status = true;
          this.worksheets.push(this.newWorksheet);
          this.wshSrv.insert(this.newWorksheet).subscribe(res => {this.wshSrv.list().subscribe(result => this.worksheets = result); } );
        }
      }
  }

  WorksheetUserInsert(usr: User) {
    this.inputSearch = 'ricerca cliente...';
    this.userWorksheet = usr;
    this.newWorksheet.userID = usr.userID;
    this.users.length = 0;
    this.users = [];
  }

  WorksheetDelete(wsh: Worksheet) {
    if (confirm('Eliminare scheda?')) {
      const index = this.worksheets.indexOf(wsh);
      if (index > -1) {
        this.wshSrv.delete(wsh).subscribe(
          event => {
            this.worksheets.splice(index, 1);
          }
        );
      }
    }
  }

  UserInsert() {
   return ;
  }

  UserSearch(src: string) {
    if (src.length >= 3) {
      this.usrSrv.search(src).subscribe(result => this.users = result);
    } else {
      this.users.length = 0;
      this.users = [];
    }
  }
}
