import { Component, OnInit } from '@angular/core';
import { WorksheetsService} from '../../services/worksheets.service';
import { UsersService} from '../../services/users.service';
import { ItemsService} from '../../services/items.service';
import {Worksheet} from '../../models/worksheet';
import {Item} from '../../models/item';
import {User} from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  openworksheetsCount: number;
  worksheetsCount: number;
  customersCount: number;
  itemsCount: number;
  items: Item[];
  worksheets: Worksheet[];
  customers: User[];


  constructor(private wshSrv: WorksheetsService,
              private usrSrv: UsersService,
              private itmSrv: ItemsService) {

               }

  ngOnInit() {

    this.wshSrv.list('').subscribe(result => {
                                              this.worksheets = result;
                                              this.wshSrv.notifyOpenWorksheetsCount(this.worksheets.filter(wsh => wsh.status === false).length);
                                              this.wshSrv.notifyWorksheetsCount(this.worksheets.length);

                                              this.usrSrv.list().subscribe(usrs => {
                                                                                      this.customers = usrs;
                                                                                      this.usrSrv.notifyUsersCount(this.customers.length);
                                                                                    });
                                              this.itmSrv.list().subscribe(itms => {
                                                                                     this.items = itms;
                                                                                     this.itmSrv.notifyItemsCount(this.items.length);
                                                                                   }

                                              );
                                             }
                                  );

    this.wshSrv.changeWorksheetsCount.subscribe(WshCnt => {
      this.worksheetsCount = WshCnt;
    });

    this.wshSrv.changeOpenWorksheetsCount.subscribe(WshCnt => {
      this.openworksheetsCount = WshCnt;
    });

    this.usrSrv.changeUsersCount.subscribe(UsrCnt => {
      this.customersCount = UsrCnt;
    });

    this.itmSrv.changeItemsCount.subscribe(ItmCnt => {
      this.itemsCount = ItmCnt;
    });

  }

}
