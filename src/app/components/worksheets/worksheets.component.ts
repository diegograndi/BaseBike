import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import { WorksheetitemsService} from '../../services/worksheetitems.service';
import { WorksheetphotosService} from '../../services/worksheetphotos.service';
import { AccountService} from '../../services/account.service';
import { UsersService} from '../../services/users.service';
import { PagerService} from '../../services/pager.service';
import {Worksheet} from '../../models/worksheet';
import {User} from '../../models/user';
import {Account} from '../../models/account';
import { Guid } from 'guid-typescript';
import { Router, ActivatedRoute} from '@angular/router';
import { NgbDateFRParserFormatter} from '../../utility/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';


@Component({
  selector: 'app-worksheets',
  templateUrl: './worksheets.component.html',
  styleUrls: ['./worksheets.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
   ]
})
export class WorksheetsComponent implements OnInit {

  worksheets: Worksheet[];
  newWorksheet: Worksheet = {};
  account: Account = {};
  users: User[];
  customer: string;
  show = false;
  showcustomer = false;
  newWorksheetDate: NgbDateStruct;
  newCustomer: User = {};
  formatter: NgbDateFRParserFormatter;
  lblBtnWorksheet: string;
  lblBtnCustomer: string;
  pager: any = {};
  pagedWorksheets: any[];
  search: string;

  constructor(private wshSrv: WorksheetsService,
              private wshitmSrv: WorksheetitemsService,
              private wshphtSrv: WorksheetphotosService,
              private actSrv: AccountService,
              private usrSrv: UsersService,
              private pagSrv: PagerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.search = params.search);
    this.actSrv.detail(this.account).subscribe(accounts => this.account = accounts);

    if (!this.search) {
      this.search = '';
    }
    this.wshSrv.list(this.search).subscribe(result => {
                                              this.worksheets = result;
                                              this.setPage(1);
                                           }
                                );

    this.lblBtnWorksheet = 'nuova scheda';
    this.lblBtnCustomer = 'nuovo cliente';

  }
  WorksheetShowHide() {
    this.show = ! this.show;
    if (this.show) {
      this.lblBtnWorksheet = 'elenco schede';
    } else {
      this.lblBtnWorksheet = 'nuova scheda';
    }
  }
  CustomerShowHide() {
    if (!this.showcustomer) {
      this.customer = '';
    }
    this.showcustomer = ! this.showcustomer;
    if (this.showcustomer) {
      this.lblBtnCustomer = 'dettaglio scheda';
    } else {
      this.lblBtnCustomer = 'nuovo cliente';
    }
  }

  WorksheetInsert() {
    if (this.newWorksheet.userID == null) {
        confirm('Selezionare un cliente');
      } else {
        if (confirm('Conferma nuova scheda?')) {

          this.formatter  = new NgbDateFRParserFormatter();
          this.newWorksheet.dateDelivery = this.formatter.YYYYMMDDformat(this.newWorksheetDate);
          this.newWorksheet.accountID = this.account[0].accountID;
          this.newWorksheet.worksheetID = Guid.create().toString();
          this.newWorksheet.worksheetType = 'Service';
          this.newWorksheet.status = true;
          this.worksheets.push(this.newWorksheet);
          this.wshSrv.insert(this.newWorksheet).subscribe(res => {
                                                                this.wshSrv.list(this.search).subscribe(result => this.worksheets = result);
                                                                 } );
          this.newWorksheet = {};
          this.show = false;
          this.newWorksheetDate = null;
        }
      }
  }

  WorksheetUserInsert(usr: User) {
    this.customer = usr.firstName + ' ' + usr.lastName;
    this.newWorksheet.userID = usr.userID;
    this.users.length = 0;
    this.users = [];
    this.showcustomer = false;
  }

  WorksheetDelete(wsh: Worksheet) {
    if (confirm('Eliminare scheda?')) {
      const index = this.worksheets.indexOf(wsh);
      if (index > -1) {
        this.wshSrv.delete(wsh).subscribe(
          event => {
            this.worksheets.splice(index, 1);
            this.setPage(1);
          }
        );
      }
    }
  }
  WorksheetSearch() {
    if (this.search.length >= 3) {
          this.wshSrv.list(this.search).subscribe(result => {
          this.worksheets = result;
          this.setPage(1);
          }
        );
    } else {
          this.wshSrv.list('').subscribe(result => {
          this.worksheets = result;
          this.setPage(1);
        }
      );
    }
  }

  CustomerInsert() {
   this.newCustomer.accountID = this.account[0].accountID;
   this.newCustomer.userID = Guid.create().toString();
   this.usrSrv.insert(this.newCustomer).subscribe(res => {
                                                  this.WorksheetUserInsert(this.newCustomer);
                                                  this.showcustomer = false;
                                                  this.newCustomer = {};
                                                  });
  }

  CustomerSearch(src: string) {
    if (src.length >= 3) {
      this.usrSrv.search(src).subscribe(res => {
                                        this.users = res;
                                        });
    } else {
      this.users.length = 0;
      this.users = [];
    }
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagSrv.getPager(this.worksheets.length, page);

    // get current page of items
    this.pagedWorksheets = this.worksheets.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
