import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { Notifications } from './models/notifications';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from './local-storage.service';
import * as fromRoot from '../app/redux/reducers';
import { Store } from '@ngrx/store';
import { FriendsChangeAction } from './redux/actions/friends';
import { Mes } from './models/mes';
import { MessagesChangeAction } from './redux/actions/messages';
import { Observable } from 'rxjs';
import { Info } from './models/info';
import { InfoChangeAction } from './redux/actions/infoList';
import { SpinnerOverlayService } from './service/spinner-overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  firstLogin = false;
  target_id;
  notification: Notifications;
  notifications: Notifications[] = [];
  constructor( private databaseService: DatabaseService, 
      private cookieService: CookieService,
      public localStore: LocalStorageService,
      public dialog: MatDialog,
      private router: Router,
      private _snackBar: MatSnackBar,
      public store: Store<fromRoot.State>,
        ){}
  ngOnInit(){
    if (this.cookieService.check("sang-app-chat")){
      var user = JSON.parse(this.cookieService.get("sang-app-chat"));
      if (user != null){

      }
      // var user = JSON.parse(this.cookieService.get("sang-app-chat"));
      // if (user != null){
      //   this.databaseService.getData<Notifications>("users/"+user.user_id + "/notifications").toPromise().then(res =>{
      //     this.notifications = res;
      // }).catch(err =>{
      //   console.log(err)
      // })
      //   this.databaseService.getData<Notifications>("users/"+user.user_id + "/notifications").subscribe(res =>{
      //     console.log(res)
      //     res.forEach(notification =>{
      //       if(notification.target_id == user.user_id){
      //         if (notification.type == 1 && notification.waiting == false){
      //           this.target_id = notification.user_id;
      //           this.notification = notification;
      //           console.log("Friend Request")
      //           this.openDialog("Please accept the request", 4);
      //         }
      //         if (notification.type == 2){
      //           this.notifications = this.notifications.filter(notification =>{
      //             return !(notification.target_id == this.notification.target_id && 
      //                     notification.user_id == this.notification.user_id &&
      //                     this.notification.type == notification.type);
      //         });
      //           if (this.localStore.getItem("friends") != null){
      //             var friends = <Array<number>>this.localStore.getItem("friends");
      //             friends.push(notification.user_id);
      //             Promise.all([
      //               this.databaseService.addFriend(user.user_id, friends),
      //               this.databaseService.removeNotification(user.user_id, this.notifications)
      //             ]).then(res =>{
      //               this.openSnackBar("The friend has accepted your request!", "");
      //             }).catch(err =>{
      //               console.log(err)
      //             });
      //           }

      //         }
      //       }
      //     })
      //   });
      // }
      // // this.spinnerService.hide();
    } else{
      this.router.navigate(["/login"]);
    }
  }
  openDialog(mes: string, type: number): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: type, name: mes, target_id: this.target_id, notification: this.notification}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      console.log('The dialog was closed');
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 200000,
      
    });
  }
}
