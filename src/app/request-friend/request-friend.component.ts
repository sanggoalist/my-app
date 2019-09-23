import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { DatabaseService } from '../database.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { WaitingAction } from '../redux/actions/waiting';
import { Notifications } from '../models/notifications';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-friend',
  templateUrl: './request-friend.component.html',
  styleUrls: ['./request-friend.component.scss']
})
export class RequestFriendComponent implements OnInit {

  @Input() target_id;
  @Input() notification: Notifications;
  notifications: Notifications[] = [];
  constructor(public databaseService: DatabaseService,
    public localStore: LocalStorageService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    public store: Store<fromRoot.State>) { }

  ngOnInit() {
    if (this.cookieService.check("sang-app-chat")){
      var user = JSON.parse(this.cookieService.get("sang-app-chat"));
      this.databaseService.getData<Notifications>("users/"+user.user_id + "/notifications").toPromise().then(res =>{
        this.notifications = res;
    }).catch(err =>{
      console.log(err)
    })
    }

  }
  handleAccept(){
    this.notifications = this.notifications.filter(notification =>{
      return !(notification.target_id == this.notification.target_id && 
              notification.user_id == this.notification.user_id &&
              this.notification.type == notification.type);
  });
    var user = JSON.parse(this.cookieService.get("sang-app-chat"));
    var friends = <Array<number>>this.localStore.getItem("friends");
    friends.push(this.target_id);
    var response: Notifications = {
      target_id: this.notification.user_id,
      user_id: user.user_id,
      type: 2,
      waiting: true,
      display_name: user.display_name
    }
      Promise.all([
        this.databaseService.addFriend(user.user_id, friends),
        this.databaseService.addNotification( this.notification.user_id,  response),
        this.databaseService.removeNotification(user.user_id, this.notifications),
        this.databaseService.setMessageIdOnUser(user.user_id, this.notification.user_id, this.notification.message_id)
      ]).then(res =>{
        this.dialog.closeAll();
      }).catch(err =>{
        console.log(err)
      })
    
  }
  handleDecline(){
    this.notifications = this.notifications.filter(notification =>{
      return !(notification.target_id == this.notification.target_id && 
              notification.user_id == this.notification.user_id &&
              this.notification.type == notification.type);
  });
    var user = JSON.parse(this.cookieService.get("sang-app-chat"));
    var response: Notifications = {
      target_id: this.notification.user_id,
      user_id: user.user_id,
      type: 3,
      waiting: true,
      display_name: user.display_name
    }
      Promise.all([
        this.databaseService.addNotification( this.notification.user_id,  response),
        this.databaseService.removeNotification(user.user_id, this.notifications)
      ]).then(res =>{
        this.dialog.closeAll();
      }).catch(err =>{
        console.log(err)
      })

  }


}
