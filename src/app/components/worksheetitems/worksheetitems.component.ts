import { Component, OnInit } from '@angular/core';
import { WorksheetitemsService} from '../../services/worksheetitems.service';
import { ActivatedRoute } from '@angular/router';
import {Item} from '../../models/item';
import {Worksheet} from '../../models/worksheet';

@Component({
  selector: 'app-worksheetitems',
  templateUrl: './worksheetitems.component.html',
  styleUrls: ['./worksheetitems.component.scss']
})
export class WorksheetItemsComponent implements OnInit {

  worksheet: Worksheet;
  items: Item[];
  constructor(private route: ActivatedRoute, private wshitmSrv: WorksheetitemsService) {
    this.route.params.subscribe(params => this.worksheet = params.wshid);
  }

  ngOnInit() {
    this.wshitmSrv.list(this.worksheet).subscribe(result => this.items = result);
  }
}

