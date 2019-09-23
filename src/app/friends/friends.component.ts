import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage.service';
import * as fromRoot from '../redux/reducers';
import { Info } from '../models/info';
import { Mes } from '../models/mes';

import { Message } from '../models/message';
import { MessageFriendChangeAction } from '../redux/actions/message';
import { MessageIdChangeAction } from '../redux/actions/messageId';
import { FriendSelectChangeAction } from '../redux/actions/friendSelect';
import { MessageIdSelectChangeAction } from '../redux/actions/messageIdSelect';
import { MessageNoticeChangeAction } from '../redux/actions/messageNotice';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  styles: [
    `myFind: {opacity: 0.1;}`
  ]
})
export class FriendsComponent implements OnInit {

  friendInfos: Info[] = [];
  friends: number[] = [];
  messageIds: Map<number,string>;
  friendSelect;
  notices: Map<number,number> = new Map();
  @Input()
  ngStyle: { [klass: string]: any; }
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
      this.store.select(fromRoot.getFriends).subscribe(friends =>{
          this.friends = friends;
          this.store.select(fromRoot.getInfoListState).subscribe(infos =>{
            this.friendInfos = infos.filter(info =>{
                return this.friends.includes(info.user_id) && info.user_id != user.user_id;
            });
          });
          this.store.select(fromRoot.getFriendListForAccept).subscribe(friends =>{
              this.friendInfos.forEach(friendInfo => {
                  if (friends.includes(friendInfo.user_id)){
                      friendInfo.waitingForFriend = true;
                  }else{
                    friendInfo.waitingForFriend = false;
                  }
              });
        });
      });
      this.store.select(fromRoot.getMessages).subscribe(map =>{
        this.messageIds = map;
      });
      this.store.select(fromRoot.getMessageNotice).subscribe(notices =>{
        if (notices != null){
          this.notices = notices;
        }
      })
    }
  }
  clickOnFriend(friend_id: number){
    this.store.dispatch(new FriendSelectChangeAction(friend_id));
    this.localStore.setItem("friendSelect", friend_id);
    this.friendSelect = friend_id;
    var messageId = this.messageIds.get(friend_id);
    this.localStore.setItem("messageSelect", messageId);
    this.store.dispatch(new MessageIdSelectChangeAction(messageId));
    this.notices.set(friend_id, 0);
    this.store.dispatch(new MessageNoticeChangeAction(this.notices));
  }

  logoutHandle(){
    this.localStore.clear();
    // this.show = false;
    this.cookieService.delete("sang-app-chat");
    this.router.navigate(["/login"]);
}

}
