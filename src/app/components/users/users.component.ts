import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import { AccountService} from '../../services/account.service';
import { UsersService} from '../../services/users.service';
import { PagerService} from '../../services/pager.service';
import {User} from '../../models/user';
import {Account} from '../../models/account';
import { Guid } from 'guid-typescript';
import { ActivatedRoute} from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Message} from '../../models/message';
import { messageType} from '../../models/message';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  account: Account = {};
  users: User[];
  customer: string;
  showcustomer = false;
  newCustomer: User = {};
  lblBtnCustomer: string;
  pager: any = {};
  pagedCustomers: any[];
  search: string;
  msg: Message;

  constructor(private wshSrv: WorksheetsService,
              private actSrv: AccountService,
              private usrSrv: UsersService,
              private pagSrv: PagerService,
              private route: ActivatedRoute,
              private msgSrv: MessageService) { }

    ngOnInit() {
      this.route.params.subscribe(params => this.search = params.search);
      this.actSrv.detail(this.account).subscribe(accounts => this.account = accounts);


      this.usrSrv.list().subscribe(result => {
                                                this.users = result;
                                                this.setPage(1);
                                             }
                                  );


      this.lblBtnCustomer = 'nuovo cliente';

    }

    CustomerShowHide() {
      if (!this.showcustomer) {
        this.customer = '';
      }
      this.showcustomer = ! this.showcustomer;
      if (this.showcustomer) {
        this.lblBtnCustomer = 'elenco clienti';
      } else {
        this.lblBtnCustomer = 'nuovo cliente';
      }
    }

    CustomerInsert() {
    if (confirm('Conferma nuova cliente?')) {
      this.newCustomer.accountID = this.account[0].accountID;
      this.newCustomer.userID = Guid.create().toString();
      this.usrSrv.insert(this.newCustomer).subscribe(res => {
                                                              /* message */
                                                              this.msg = new Message();
                                                              this.msg.message = 'anagrafica cliente inserita correttamente';
                                                              this.msg.type = messageType.success;
                                                              this.msgSrv.add(this.msg);
                                                              setTimeout(function() {
                                                              this.msgSrv.clear();
                                                              }.bind(this), 1500);
                                                      this.users.push(this.newCustomer);
                                                      this.setPage(1);
                                                      this.showcustomer = false;
                                                      this.newCustomer = {};
                                                      });
      }
    }

    CustomerDelete(usr: User) {
      if (confirm('Eliminare cliente?')) {
        const index = this.users.indexOf(usr);
        if (index > -1) {
          this.usrSrv.delete(usr).subscribe(event => {
                                                      this.users.splice(index, 1);
                                                      this.setPage(1);
                                                      /* message */
                                                      this.msg = new Message();
                                                      this.msg.message = 'anagrafica cliente eliminata correttamente';
                                                      this.msg.type = messageType.success;
                                                      this.msgSrv.add(this.msg);
                                                      setTimeout(function() {
                                                      this.msgSrv.clear();
                                                      }.bind(this), 1500);
            }
          );
        }
      }
    }

    CustomerSearch() {
      if (this.search.length >= 3) {
        this.usrSrv.search(this.search).subscribe(result => {
        this.users = result;
        this.setPage(1);
        }
      );
        } else {
              this.usrSrv.search('').subscribe(result => {
              this.users = result;
              this.setPage(1);
            }
          );
        }
    }

    setPage(page: number) {
      // get pager object from service
      this.pager = this.pagSrv.getPager(this.users.length, page);

      // get current page of items
      this.pagedCustomers = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  }
