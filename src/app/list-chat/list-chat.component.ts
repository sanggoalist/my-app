import { Component, OnInit, Input, OnChanges, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Message } from '../models/message';
import { User } from '../models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss']
})
export class ListChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('scrollMe', {read: ElementRef, static: true}) private myScrollContainer: ElementRef;
  forM = 'YYYY-MM-DD HH:mm:ss';
  messagess: Message[] = [];

  @Input() friend: User;
  @Input() userId: number;
  text = "";
  id = null;
  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    if (this.friend.message != null){
      this.messagess = this.friend.message;
    }

    // this.databaseService.getData<Message>("users/"+this.id+"/message").subscribe(res =>{
    //   this.messagess = res;
    // })
  }
  ngOnChanges(event){
    this.messagess = event.friend.currentValue.message;
    this.id = event.friend.currentValue.user_id;
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  handleClick(){
    if (this.text == null || this.text === '' || this.text.length === 0){
      this.text = '';
      return;
    }
    var mes = new Message();
    mes.message = this.text;
    this.text = '';
    mes.send_at = moment(moment.now()).format(this.forM).toString();
    mes.user_id = this.userId;
    this.messagess = (this.messagess === undefined)?[]:this.messagess;
    this.messagess.push(mes)
    this.databaseService.updateMessage("users/"+this.id+"", this.messagess).then(res =>{

    });
  }
  onEnterKeyPress(event: any) {
    if (event.key === 'Enter') {
      this.handleClick();
    }
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
