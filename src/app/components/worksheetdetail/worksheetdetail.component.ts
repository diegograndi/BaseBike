import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worksheetdetail',
  templateUrl: './worksheetdetail.component.html',
  styleUrls: ['./worksheetdetail.component.scss']
})
export class WorksheetdetailComponent implements OnInit {

  wshid: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.wshid = params.wshid);
  }

}
