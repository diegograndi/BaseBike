import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksheetsService} from '../../services/worksheets.service';
import { WorksheetitemsService} from '../../services/worksheetitems.service';
import { WorksheetphotosService} from '../../services/worksheetphotos.service';
import { UsersService} from '../../services/users.service';
import { MessageService } from '../../services/message.service';
import {Worksheet} from '../../models/worksheet';
import {Item} from '../../models/item';
import {Photo} from '../../models/photo';
import {User} from '../../models/user';
import { Guid } from 'guid-typescript';
import { NgbDateFRParserFormatter} from '../../utility/dateformat';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Message} from '../../models/message';
import { messageType} from '../../models/message';
@Component({
  selector: 'app-worksheetdetail',
  templateUrl: './worksheetdetail.component.html',
  styleUrls: ['./worksheetdetail.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}
   ]
})
export class WorksheetdetailComponent implements OnInit {

  worksheet: Worksheet = {};
  newItem: Item = {};
  items: Item[];
  photos: Photo[];
  user: User = {};
  worksheetDeliveryDate: NgbDateStruct;
  msg: Message;

  formatter: NgbDateFRParserFormatter;

  constructor(private route: ActivatedRoute,
              private wshSrv: WorksheetsService,
              private wshitmSrv: WorksheetitemsService,
              private wshphtSrv: WorksheetphotosService,
              private usrSrv: UsersService,
              private msgSrv: MessageService) {
    this.route.params.subscribe(params => this.worksheet = params.wshid);
    this.route.params.subscribe(params => this.user = params.usrid);
  }

  ngOnInit() {
    this.wshSrv.detail(this.worksheet).subscribe(worksheets => {
                                                                this.worksheet = worksheets;
                                                              });
    this.wshitmSrv.list(this.worksheet).subscribe(result => this.items = result);
    this.wshphtSrv.list(this.worksheet).subscribe(result => this.photos = result);
    this.usrSrv.detail(this.user).subscribe(users => this.user = users);


  }

  WorksheetUpdate() {
    /* update worksheet */

    /* if delivery date is changed */
    if (this.worksheetDeliveryDate != null) {
      this.formatter = new NgbDateFRParserFormatter();
      this.worksheet[0].dateDelivery = this.formatter.YYYYMMDDformat(this.worksheetDeliveryDate);
    }

    this.msg = new Message();
    this.msg.message = 'scheda di lavoro aggiornata correttamente';
    this.msg.type = messageType.success;

    this.wshSrv.update(this.worksheet[0]).subscribe(wsh => {
                                                              this.worksheet[0] = wsh;
                                                              /* message */
                                                              this.msgSrv.add(this.msg);
                                                              setTimeout(function() {
                                                              this.msgSrv.clear();
                                                              }.bind(this), 3000);
                                                              /* items */
                                                              for (const itm of this.items) {
                                                                this.wshitmSrv.update(itm).subscribe();
                                                              }
                                                              /* user */
                                                              this.usrSrv.update(this.user[0]).subscribe();
                                                            }
                                                      );

  }

  WorksheetUpdateStatus() {
    this.worksheet[0].status = !this.worksheet[0].status;
    this.WorksheetUpdate();
  }

  WorksheetSendMail() {
    this.msg = new Message();
    this.msg.message = 'notifica email inviata a ' + this.user[0].email;
    this.msg.type = messageType.success;
    this.msgSrv.add(this.msg);
    setTimeout(function() {
    this.msgSrv.clear();
    }.bind(this), 3000);
  }

  WorksheetItemDelete(itm: Item) {
      this.msg = new Message();
      this.msg.message = 'servizio eliminato correttamente';
      this.msg.type = messageType.success;
      const index = this.items.indexOf(itm);
      if (index > -1) {
        this.wshitmSrv.delete(itm).subscribe(
          event => {
            this.items.splice(index, 1);
            this.msgSrv.add(this.msg);
            setTimeout(function() {
            this.msgSrv.clear();
            }.bind(this), 1500);
          }
        );
      }
  }

  WorksheetItemInsert() {
    this.newItem.worksheetID = this.worksheet[0].worksheetID;
    this.newItem.accountID = this.worksheet[0].accountID;
    this.newItem.itemID = Guid.create().toString();
    this.newItem.active = true;
    this.newItem.worksheetItemID = Guid.create().toString();
    this.newItem.hh = 0;
    this.newItem.mm = 0;
    this.newItem.itemType = 'Service';
    console.log(this.newItem.name);

      this.msg = new Message();
      this.msg.message = 'servizio aggiornato correttamente';
      this.msg.type = messageType.success;

      this.wshitmSrv.insert(this.newItem).subscribe(
          event => {
            this.items.push(this.newItem);
            this.newItem = {};
            this.msgSrv.add(this.msg);
            setTimeout(function() {
            this.msgSrv.clear();
            }.bind(this), 1500);
          }
        );
  }
}
