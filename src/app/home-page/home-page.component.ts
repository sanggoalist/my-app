import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../redux/reducers';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage.service';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { FriendsChangeAction } from '../redux/actions/friends';
import { Info } from '../models/info';
import { InfoChangeAction } from '../redux/actions/infoList';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Mes } from '../models/mes';
import { MessagesChangeAction } from '../redux/actions/messages';
import { Notifications } from '../models/notifications';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Wra } from '../models/wra';
import { Message } from '../models/message';
import { MessageFriendChangeAction } from '../redux/actions/message';
import { WrapperMessage } from '../models/wrapperMessage';
import { MessageNoticeChangeAction } from '../redux/actions/messageNotice';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  messageIds: Map<number,string>;
  private friendId;
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private router: Router,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService,
    private _snackBar: MatSnackBar) {
     }

  ngOnInit() {
    this.localStore.removeItem("friendSelect");
    this.localStore.removeItem("messageSelect");
    this.spinnerService.show();
    if (!this.cookieService.check("sang-app-chat")){
      this.openDialog("Please login again!");
      this.dialog.afterAllClosed.subscribe(res =>{
        this.spinnerService.hide();
        this.router.navigate(["/login"]);
      })
      return;
    }
    else
    {
      var user = JSON.parse(this.cookieService.get("sang-app-chat"));
      if (user != null) {
                //Friends
                this.databaseService.getData<number>("users/"+user.user_id + "/friends").subscribe(res =>{
                  console.log("Friends has been changed")
                  this.store.dispatch(new FriendsChangeAction(res));
                  this.localStore.setItem("friends", res);
                });
                //Info Friend
                this.databaseService.getData<Info>("info").subscribe(infos =>{
                  console.log("Info has been changed")
                  var userInfo :Info = infos.find(info => {return info.user_id == user.user_id});
                  this.localStore.setItem("userInfo", userInfo);
                  this.store.dispatch(new InfoChangeAction(infos))
                });
                //MessageId
                this.databaseService.getData<Mes>("users/" + user.user_id + "/mes").subscribe(res =>{
                  console.log("MessageIds has been changed")
                  var map: Map<number,string> = new Map();
                  res.forEach(mes =>{
                    map.set(mes.target_id, mes.message_id);
                  });
                  this.store.dispatch(new MessagesChangeAction(map));
                });
                //Messages
                this.databaseService.getList("messages").on("value", res =>{
                  this.store.select(fromRoot.getMessages).subscribe(frs =>{
                    if (frs != null){
                      var mess: Map<number, string> = frs;
                      var counts: Map<number,number> = new Map();
                      mess.forEach(m =>{
                      if (res.hasChild(m)){
                        var count: number = 0;
                        var num: number = -1;
                        res.child(m).forEach(r =>{
                          var mes: WrapperMessage = r.exportVal();
                          num = mes.sender_id;
                          var friendId = this.localStore.getItem("friendSelect");
                          if (friendId == mes.sender_id){
                            mes.read = true;
                            r.ref.update(mes);
                          }
                          if (mes != null && mes.read != null && mes.target_id == user.user_id && mes.sender_id != friendId && !mes.read){
                            count = count + 1;
                          }
                        });
                        counts.set(num,count);
                      }   
                      })
                      this.store.dispatch(new MessageNoticeChangeAction(counts));
                    }
                  })
                  var messageId = this.localStore.getItem("messageSelect");
                  if (messageId != null && res.hasChild(messageId)){
                    var mess: WrapperMessage[] = [];
                    res.child(messageId).forEach(r =>{
                        mess.push(r.exportVal());
                    });
                    this.store.dispatch(new MessageFriendChangeAction(mess));
                  }
                });
                

                this.databaseService.getData<Notifications>("users/"+user.user_id + "/notifications").subscribe(notifications =>{
                  console.log("Notifications has been changed");
                  notifications.forEach(notification =>{
                    if(notification.target_id == user.user_id){
                      if (notification.type === 4 && notification.waiting){
                        var friendSelectId = this.localStore.getItem("friendSelect");
                            if (friendSelectId != notification.user_id){
                              this.openSnackBar(notification.display_name + " is sending you a message", notification.nickname);
                            } 
                            var afterNotifications: Notifications[] = notifications.filter(anotification =>{
                              return anotification != notification;
                            });
                            this.databaseService.removeNotification(user.user_id, afterNotifications).then(res =>{
                            }).catch(err =>{
                              console.log(err)
                            });
                        }
                    }
                  });
                });
      }
      this.spinnerService.hide();
    }
  }
  openDialog(mes: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: 1, name: mes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });

  }

}
