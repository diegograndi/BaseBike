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
@Component({
  selector: 'app-worksheetdetail',
  templateUrl: './worksheetdetail.component.html',
  styleUrls: ['./worksheetdetail.component.scss']
})
export class WorksheetdetailComponent implements OnInit {

  worksheet: Worksheet = {};
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
    this.wshSrv.update(this.worksheet[0]).subscribe();
  }

  WorksheetItemDelete(itm: Item) {
    this.wshitmSrv.
  }
}
