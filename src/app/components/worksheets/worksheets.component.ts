import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import {Worksheet} from '../../models/worksheet';

@Component({
  selector: 'app-worksheets',
  templateUrl: './worksheets.component.html',
  styleUrls: ['./worksheets.component.scss']
})
export class WorksheetsComponent implements OnInit {

  worksheets: Worksheet[];
  constructor(private wshSrv: WorksheetsService) { }

  ngOnInit() {
    this.wshSrv.list().subscribe(result => this.worksheets = result);
  }
}

