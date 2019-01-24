import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import { ItemsService} from '../../services/items.service';
import { AccountService} from '../../services/account.service';
import { UsersService} from '../../services/users.service';
import { PagerService} from '../../services/pager.service';
import {Worksheet} from '../../models/worksheet';
import {User} from '../../models/user';
import {Item} from '../../models/item';
import {Account} from '../../models/account';
import { Guid } from 'guid-typescript';
import { Router, ActivatedRoute} from '@angular/router';
import { NgbDateFRParserFormatter} from '../../utility/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { WorksheetitemsService } from 'src/app/services/worksheetitems.service';
import { stringify } from '@angular/compiler/src/util';


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
  defaultItems: Item[];
  newItem: Item;

  public popoverDeleteWshTitle: string = 'Scheda di lavoro';
  public popoveDeleteWshMessage: string = 'Confermare cancellazione?';
  public popoverConfirmTxt: string = 'OK';
  public popoverCancelTxt: string = 'Cancella';

  public popoverInsertWshTitle: string = 'Scheda di lavoro';
  public popoveInsertWshMessage: string = 'Inserire o selezionare un cliente';




  constructor(private wshSrv: WorksheetsService,
              private actSrv: AccountService,
              private wshitmSrv: WorksheetitemsService,
              private itmSrv: ItemsService,
              private usrSrv: UsersService,
              private pagSrv: PagerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.search = params.search);
    this.actSrv.detail(this.account).subscribe(accounts => {this.account[0] = accounts;
      if (!this.search) {
        this.search = '';
      }

      if (this.account[0] != null) {
        this.wshSrv.list(this.search).subscribe(result => {
                                                          this.worksheets = result;
                                                          this.setPage(1);
                                                          this.wshSrv.notifyOpenWorksheetsCount(this.worksheets.filter(
                                                                                                wsh => wsh.status === false).length);
                                                                                                this.wshSrv.notifyWorksheetsCount(this.worksheets.length);
                                                          }
                                                );

        this.lblBtnWorksheet = 'nuova scheda';
        this.lblBtnCustomer = 'nuovo cliente';
      }
                                                           }
                                              );




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
    if (this.newWorksheet.userID == null || this.customer === '') {
      this.popoveInsertWshMessage = 'Inserire o selezionare un cliente';
      } else {
          this.formatter  = new NgbDateFRParserFormatter();
          this.newWorksheet.dateDelivery = this.formatter.YYYYMMDDformat(this.newWorksheetDate);
          this.newWorksheet.accountID = this.account[0].accountID;
          this.newWorksheet.worksheetID = Guid.create().toString();
          this.newWorksheet.worksheetType = 'Service';
          this.newWorksheet.status = true;
          this.worksheets.push(this.newWorksheet);
          this.wshSrv.insert(this.newWorksheet).subscribe(res => {
                                                                this.wshSrv.list(this.search).subscribe(result => this.worksheets = result);
                                                                this.wshSrv.notifyWorksheetsCount(this.worksheets.length);
                                                                this.wshSrv.notifyOpenWorksheetsCount(this.worksheets.filter(
                                                                                                      wsh => wsh.status === false).length);
                                                                 this.WorksheetDefaultItemsInsert(this.newWorksheet);
                                                                 } );

          this.show = false;
          this.newWorksheetDate = null;

      }
  }

  WorksheetDefaultItemsInsert(wsh: Worksheet) {

    /* retrive default items for worksheet */
    this.itmSrv.list().subscribe(result => { this.defaultItems = result;
                                              console.log(this.defaultItems.length);
                                              for (let i = 0; i < this.defaultItems.length; i++) {
                                                if (this.defaultItems[i].inworksheet) {
                                                  this.newItem =  new Item();
                                                  this.newItem.worksheetID = wsh.worksheetID;
                                                  this.newItem.accountID = wsh.accountID;
                                                  this.newItem.name = this.defaultItems[i].name;
                                                  this.newItem.description = this.defaultItems[i].description;
                                                  this.newItem.price = this.defaultItems[i].price;
                                                  this.newItem.itemID = this.defaultItems[i].itemID;
                                                  this.newItem.active = true;
                                                  this.newItem.worksheetItemID = Guid.create().toString();
                                                  this.newItem.hh = this.defaultItems[i].hh;
                                                  this.newItem.mm = this.defaultItems[i].mm;
                                                  this.newItem.itemType = this.defaultItems[i].itemType;
                                                  this.wshitmSrv.insert(this.newItem).subscribe();
                                                }
                                              }
                                           });
   }

  WorksheetUserInsert(usr: User) {
    this.customer = usr.firstName + ' ' + usr.lastName;
    this.newWorksheet.userID = usr.userID;
    this.popoveInsertWshMessage = 'Confermare inserimento?';
    this.users.length = 0;
    this.users = [];
    this.showcustomer = false;
  }

  WorksheetDelete(wsh: Worksheet) {
      const index = this.worksheets.indexOf(wsh);
      if (index > -1) {
        this.wshSrv.delete(wsh).subscribe(
          event => {
            this.worksheets.splice(index, 1);
            this.setPage(1);
            this.wshSrv.notifyWorksheetsCount(this.worksheets.length);
            this.wshSrv.notifyOpenWorksheetsCount(this.worksheets.filter(wshdel => wsh.status === false).length);
          }
        );
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
   this.popoveInsertWshMessage = 'Confermare inserimento?';
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
