import { Component, OnInit } from '@angular/core';
import { WorksheetphotosService} from '../../services/worksheetphotos.service';
import { ActivatedRoute } from '@angular/router';
import {Photo} from '../../models/photo';
import {Worksheet} from '../../models/worksheet';

@Component({
  selector: 'app-worksheetphotos',
  templateUrl: './worksheetphotos.component.html',
  styleUrls: ['./worksheetphotos.component.scss']
})
export class WorksheetphotosComponent implements OnInit {

  worksheet: Worksheet;
  photos: Photo[];
  constructor(private route: ActivatedRoute, private wshphtSrv: WorksheetphotosService) {
    this.route.params.subscribe(params => this.worksheet = params.wshid);
  }

  ngOnInit() {
    this.wshphtSrv.list(this.worksheet).subscribe(result => this.photos = result);
  }
}
