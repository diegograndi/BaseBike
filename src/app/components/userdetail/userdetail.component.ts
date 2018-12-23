import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, UrlSegment, DefaultUrlSerializer } from '@angular/router';
import { UsersService} from '../../services/users.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.scss']
})
export class UserdetailComponent implements OnInit {
  user: User;
  constructor(private route: ActivatedRoute, private usrSrv: UsersService) {
    this.route.params.subscribe(params => this.user = params.usrid);
  }

  ngOnInit() {
    this.usrSrv.detail(this.user).subscribe(
      users => this.user = users
    );
  }
}
