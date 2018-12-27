import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksheetsService} from '../../services/worksheets.service';
import { WorksheetitemsService} from '../../services/worksheetitems.service';
import { WorksheetphotosService} from '../../services/worksheetphotos.service';
import { UsersService} from '../../services/users.service';
import {Worksheet} from '../../models/worksheet';
import {Item} from '../../models/item';
import {Photo} from '../../models/photo';
import {User} from '../../models/user';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-worksheetdetail',
  templateUrl: './worksheetdetail.component.html',
  styleUrls: ['./worksheetdetail.component.scss']
})
export class WorksheetdetailComponent implements OnInit {

  worksheet: Worksheet = {};
  newItem: Item = {};
  items: Item[];
  photos: Photo[];
  user: User;
  constructor(private route: ActivatedRoute,
              private wshSrv: WorksheetsService,
              private wshitmSrv: WorksheetitemsService,
              private wshphtSrv: WorksheetphotosService,
              private usrSrv: UsersService) {
    this.route.params.subscribe(params => this.worksheet = params.wshid);
    this.route.params.subscribe(params => this.user = params.usrid);
  }

  ngOnInit() {
    this.wshSrv.detail(this.worksheet).subscribe(worksheets => this.worksheet = worksheets);
    this.wshitmSrv.list(this.worksheet).subscribe(result => this.items = result);
    this.wshphtSrv.list(this.worksheet).subscribe(result => this.photos = result);
    this.usrSrv.detail(this.user).subscribe(users => this.user = users);
  }

  WorksheetUpdate() {
    /* update worksheet */
    this.wshSrv.update(this.worksheet[0]).subscribe(wsh => this.worksheet[0] = wsh);
    /* update items */
    for (const itm of this.items) {
      this.wshitmSrv.update(itm).subscribe();
    }
  }

  WorksheetItemDelete(itm: Item) {
    if (confirm('Eliminare servizio?')) {
      const index = this.items.indexOf(itm);
      if (index > -1) {
        this.wshitmSrv.delete(itm).subscribe(
          event => {
            this.items.splice(index, 1);
          }
        );
      }
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
    if (confirm('Confermare servizio?')) {
      this.wshitmSrv.insert(this.newItem).subscribe(
          event => {
            this.items.push(this.newItem);
            this.newItem = {};
          }
        );
    }
  }
}
