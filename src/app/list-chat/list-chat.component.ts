import { Component, OnInit, Input, OnChanges, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Message } from '../models/message';
import { User } from '../models/user';
import * as moment from 'moment';
import { LocalStorageService } from '../local-storage.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { WrapperMessage } from '../models/wrapperMessage';
import { Mes } from '../models/mes';
import { MessageIdChangeAction } from '../redux/actions/messageId';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.scss']
})
export class ListChatComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('scrollMe', {read: ElementRef, static: true}) private myScrollContainer: ElementRef;
  forM = 'YYYY-MM-DD HH:mm:ss';
  messagess: Message[] = [];
  messageses: WrapperMessage[] = [];
  userId = null;
  @Input() friend: User;
  @Input() user_id: number;
  text = "";
  targetId = null;
  messageId = null;
  constructor(public databaseService: DatabaseService,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService) { }

  ngOnInit() {
    this.store.select(fromRoot.getMessageId).subscribe(mes =>{
      this.messageId = mes;
      if (mes != null){
        this.databaseService.getData<WrapperMessage>("messages/" + mes).subscribe(res =>{
          this.messageses = res;
        })
      } else{
        this.messageses = [];
      }
    });
    this.store.select(fromRoot.getAmountState).subscribe(res =>{
        this.targetId = res;
    })

    // this.databaseService.getData<Message>("users/"+this.id+"/message").subscribe(res =>{
    //   this.messagess = res;
    // })
  }
  ngOnChanges(event){
    // if (event.friend.currentValue.message[this.user_id.toString()] == ""){
    //   this.messagess = [];
    // }else
    // this.messagess = event.friend.currentValue.message[this.user_id.toString()];
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  handleClick(){
    if (this.text == null || this.text === '' || this.text.length === 0){
      this.text = '';
      return;
    }
    var mes: WrapperMessage = {
      message: null,
      send_at: null,
      sender_id: null,
      target_id: null
    };
    mes.message = this.text;
    this.text = '';
    mes.send_at = moment(moment.now()).format(this.forM).toString();
    mes.sender_id = this.user_id;
    mes.target_id = this.targetId;
    if (this.messageId != null){
      this.databaseService.sendMessage(mes, this.messageId).then(res =>{

      }).catch(err =>{
        console.log(err);
      })
    } else{
      console.log(this.user_id)
      const m = moment.now();
      const messageId = moment(m).unix();
      Promise.all([
        this.databaseService.sendMessage(mes, messageId.toString()),
        this.databaseService.setMessageIdOnUser(this.user_id, this.targetId, messageId),
        this.databaseService.setMessageIdOnUser(this.targetId,this.user_id, messageId)
      ]).then(res =>{
        this.messagess.push(mes);
        var mes: Mes = {
          message_id: messageId.toString(),
          target_id: this.targetId
        }
        var messList = <Array<Mes>>this.localStore.getItem("messageIdMap");
        messList.push(mes);
        this.localStore.setItem("messageIdMap", messList);
        this.store.dispatch(new MessageIdChangeAction(messageId));
      }).catch(err =>{
        console.log(err)
      })
    }
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
