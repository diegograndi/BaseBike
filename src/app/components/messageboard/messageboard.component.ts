import { Component, OnInit} from '@angular/core';

 import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.scss']
})
export class MessageboardComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
