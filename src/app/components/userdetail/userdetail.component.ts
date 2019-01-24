import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, UrlSegment, DefaultUrlSerializer } from '@angular/router';
import { UsersService} from '../../services/users.service';
import { WorksheetsService} from '../../services/worksheets.service';
import { MessageService } from '../../services/message.service';
import {User} from '../../models/user';
import {Worksheet} from '../../models/worksheet';
import { Message} from '../../models/message';
import { messageType} from '../../models/message';
import { TryCatchStmt } from '@angular/compiler';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  user: User;
  worksheets: Worksheet[];
  msg: Message;

  public popoverUpdateUsrTitle: string = 'Anagrafica cliente';
  public popoverUpdateUsrMessage: string = 'Aggiornare anagrafica?';
  public popoverConfirmTxt: string = 'OK';
  public popoverCancelTxt: string = 'Cancella';


  constructor(private route: ActivatedRoute,
              private usrSrv: UsersService,
              private wshSrv: WorksheetsService,
              private msgSrv: MessageService) {
    this.route.params.subscribe(params => this.user = params.usrid);
  }

  ngOnInit() {
    this.usrSrv.detail(this.user).subscribe(
                                            users => {
                                              this.user = users;
                                            });

    this.wshSrv.listByUser(this.user).subscribe(wshs => this.worksheets = wshs);

  }

  CustomerUpdate() {

    try {
          this.usrSrv.update(this.user[0]).subscribe(usr => {
          this.user[0] = usr;
          /* message */
          this.msg = new Message();
          this.msg.message = 'anagrafica cliente aggiornata correttamente';
          this.msg.type = messageType.success;
          this.msgSrv.add(this.msg);
          setTimeout(function() {
          this.msgSrv.clear();
          }.bind(this), 1000);
        });

    } catch (error) {
        /* message */
        this.msg = new Message();
        this.msg.message = error;
        this.msg.type = messageType.danger;
        this.msgSrv.add(this.msg);
        setTimeout(function() {
        this.msgSrv.clear();
        }.bind(this), 1000);
    }

   }



}
