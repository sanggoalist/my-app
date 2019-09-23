import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { CookieService } from 'ngx-cookie-service';
import { Message } from '../models/message';
import { WrapperMessage } from '../models/wrapperMessage';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Mes } from '../models/mes';
import { Notifications } from '../models/notifications';
import { Info } from '../models/info';
import { MessageFriendChangeAction } from '../redux/actions/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {read: ElementRef, static: true}) private myScrollContainer: ElementRef;
  messageses: Message[] = [];
  user_id: number;
  dateFormat = 'YYYY-MM-DD HH:mm:ss';
  text = "";
  targetId = null;
  messageId = null;
  ob: Observable<any>;

  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private router: Router,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService) { }

  ngOnInit() {
    if (this.cookieService.check("sang-app-chat")){
      var user = JSON.parse(this.cookieService.get("sang-app-chat"));
      this.user_id = user.user_id;
      this.store.select(fromRoot.getMessageFriend).subscribe(messages =>{
        this.messageses = messages;
      });
      this.store.select(fromRoot.getFriendSelect).subscribe(friendId =>{
        this.targetId = friendId;
        this.localStore.setItem("friendSelect", friendId);
      });
      this.store.select(fromRoot.getMessageIdSelect).subscribe(messageId =>{
        this.messageId = messageId;
        this.localStore.setItem("messageSelect", messageId);
        if (this.messageId != null ){
          this.databaseService.getList("messages/" + this.messageId).once("value", res =>{
            var mess: WrapperMessage[] = [];
            res.forEach(r =>{
              var me: WrapperMessage = r.exportVal();
              if (!me.read){
                me.read = true;
              }
              r.ref.update(me); 
              mess.push(me);
            });
            this.messageses = mess;
          })
        }else{
          this.messageses = [];
        }
      });
    }
  }

  sendMessage(){
    if (this.text == null || this.text === '' || this.text.length === 0){
      this.text = '';
      return;
    }
    if (this.targetId == null){
      return;
    }
    var mes: WrapperMessage = {
      message: null,
      send_at: null,
      sender_id: null,
      target_id: null,
      read: null
    };
    mes.message = this.text;
    this.text = '';
    mes.send_at = moment(moment.now()).format(this.dateFormat).toString();
    mes.sender_id = this.user_id;
    mes.target_id = this.targetId;
    mes.read = false;
    var userInfo: Info = this.localStore.getItem("userInfo");
    var notification: Notifications = {
      display_name: userInfo.display_name,
      target_id: this.targetId,
      type: 4,
      waiting: true,
      nickname: userInfo.nickname,
      user_id: this.user_id
    }
    Promise.all([
      this.databaseService.sendMessage(mes, this.messageId),
      this.databaseService.addNotification(this.targetId, notification)
      // this.databaseService.setMessageIdOnUser(this.user_id, this.targetId, this.messageId),
      // this.databaseService.setMessageIdOnUser(this.targetId,this.user_id, this.messageId)
    ]).then(res =>{
      
    }).catch(err =>{
      console.log(err)
    })
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  } 
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }


}
