import { Component, OnInit } from '@angular/core';
import {Item} from '../../models/item';
import { AccountService} from '../../services/account.service';
import { ItemsService} from '../../services/items.service';
import { PagerService} from '../../services/pager.service';
import {Account} from '../../models/account';
import { Guid } from 'guid-typescript';
import { ActivatedRoute} from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Message} from '../../models/message';
import { messageType} from '../../models/message';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public popoverDeleteItmTitle: string = 'Servizi';
  public popoveDeleteImtMessage: string = 'Confermare cancellazione?';
  public popoverInsertItmTitle: string = 'Servizi';
  public popoverInsertImtMessage: string = 'Confermare inserimento?';
  public popoverUpdateItmTitle: string = 'Servizi';
  public popoverUpdateImtMessage: string = 'Aggiornare servizio?';
  public popoverConfirmTxt: string = 'OK';
  public popoverCancelTxt: string = 'Cancella';

  newItem: Item = {};
  items: Item[];
  CurrItem: Item = {};
  account: Account = {};

  private value: any = {};

  constructor(private actSrv: AccountService,
              private itmSrv: ItemsService) { }

  ngOnInit() {
    this.itmSrv.list().subscribe(result => { this.items = result; });
    this.actSrv.detail(this.account).subscribe(accounts => {this.account[0] = accounts; } );
   }

  validate(): boolean {
    if ( this.newItem.itemType !== '' &&  this.newItem.name !== '' &&  this.newItem.description !== '' && this.newItem.price > 0 ) {
      return true;
    } else {
      return false;
    }

  }
  itemChanged(itm: Item) {
    this.CurrItem = itm;
    this.itmSrv.update(this.CurrItem).subscribe();
    return;
  }
  itemUpdate(itm: Item) {
    this.CurrItem = itm;
    this.itmSrv.update(this.CurrItem).subscribe();
    return;
  }
  ItemDelete(itm: Item) {
    const index = this.items.indexOf(itm);
    this.itmSrv.delete(itm) .subscribe(event => {this.items.splice(index, 1); } );
}

ItemInsert() {
  this.newItem.accountID = this.account[0].accountID;
  this.newItem.itemID = Guid.create().toString();
  this.itmSrv.insert(this.newItem).subscribe(event => {this.items.push(this.newItem);
                                                       this.newItem = {};
                                                      } );
}

typeSelected(event) {

}

}
