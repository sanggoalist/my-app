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
  userId = null;
  @Input() friend: User;
  @Input() user_id: number;
  text = "";
  id = null;
  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {

    if (this.friend.message[this.user_id.toString()] != null){
      this.messagess = this.friend.message[this.user_id.toString()];
    }

    // this.databaseService.getData<Message>("users/"+this.id+"/message").subscribe(res =>{
    //   this.messagess = res;
    // })
  }
  ngOnChanges(event){
    if (event.friend.currentValue.message[this.user_id.toString()] == ""){
      this.messagess = [];
    }else
    this.messagess = event.friend.currentValue.message[this.user_id.toString()];
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
    mes.user_id = this.user_id;
    this.messagess = (this.messagess === undefined)?[]:this.messagess;
    this.messagess.push(mes)
    Promise.all([
      this.databaseService.sendMessage(this.user_id, this.friend.user_id, this.messagess),
      this.databaseService.sendTargetMessage(this.user_id, this.friend.user_id, this.messagess)
    ]).then(res =>{
      
    }).catch((error) =>{

    })
    // this.databaseService.updateMessage("users/"+this.id+"", this.messagess).then(res =>{

    // });
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
