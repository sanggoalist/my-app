import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { CookieService } from 'ngx-cookie-service';
import { InfoAuthen } from '../models/infoAuth';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { WrapperMessage } from '../models/wrapperMessage';
import { Info } from '../models/info';
import { LocalStorageService } from '../local-storage.service';
import { InfoChangeAction } from '../redux/actions/infoList';
import { Mes } from '../models/mes';
import { MessageIdChangeAction } from '../redux/actions/messageId';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessagesChangeAction } from '../redux/actions/messages';
import { FriendsChangeAction } from '../redux/actions/friends';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnChanges {
  show = false;
  friendId = null;
  userId = null;
  friend: User;
  infoList: Info[] = [];
  userList: User[] = [];
  amount: number = -1;
  message_id: string;
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private router: Router,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService) { 
    }

  ngOnInit() {
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
                var ob1 = this.databaseService.getData<Info>("info");
                this.databaseService.getData<number>("users/"+user.user_id + "/friends").subscribe(res =>{
                  this.store.dispatch(new FriendsChangeAction(res));
                  this.localStore.setItem("friends", res);
                  this.databaseService.getData<Info>("info").subscribe(infos =>{
                    var infoList = infos.filter(info => {
                      return res.includes(info.user_id) && info.user_id != user.user_id});
                    this.store.dispatch(new InfoChangeAction(infoList))
                  });
                });
                //Message Map
                this.databaseService.getData<Mes>("users/"+user.user_id + "/mes").subscribe(res =>{
                  var map:Map<number,string> = new Map<number,string>();
                  res.forEach(r =>{
                    map.set(r.target_id, r.message_id);
                  });
                  this.store.dispatch(new MessagesChangeAction(map));
                });
      }


      // this.databaseService.getData<number>("users/"+user.user_id + "/friends").subscribe(res =>{
      //   this.localStore.setItem("friends",res);
      //    this.databaseService.getData<Info>("info").subscribe(res =>{
      //     if (this.localStore.getItem("friends") != null){
      //       var a = <Array<number>>this.localStore.getItem("friends");
      //       console.log(res);
      //       console.log(a);
      //       this.infoList = res.filter(info => {
      //         return a.includes(info.user_id) && info.user_id != user.user_id});
      //         this.store.dispatch(new InfoChangeAction(this.infoList));
      //     }
      //   });
      //   // this.spinnerService.hide();
      // });
      // this.databaseService.getData<User>("users").subscribe(res =>{
      //     if (this.userList.length !== 0){
      //       this.userList = [];
      //     }
      //     console.log(res)
      //     res.forEach(element => {
      //       if (element.friends != null && element.friends.includes(user.user_id)){
      //         this.userList.push(element)
      //       }
      //     });
      //     this.userId = user.user_id;
      //     this.spinnerService.hide();
      // });

      this.store.select(fromRoot.getAmountState).subscribe(res =>{
        this.amount = res;
        if (this.amount != null && this.amount >= 0){
          this.show = true;
          this.friend = this.userList.find(user => {return user.user_id === this.amount;});
          var mesIds:  Array<Mes>= this.localStore.getItem("messageIdMap");
          if (mesIds != null){
            var mes = mesIds.find(mes => {return mes.target_id == this.amount});
            if (mes != null){
              this.store.dispatch(new MessageIdChangeAction(1));
            }else{
              this.store.dispatch(new MessageIdChangeAction(null));
            }
          }
        }
      });
    }
    this.spinnerService.hide();
  }
  ngOnChanges(event){
    console.log(event)
  }
  onFriendChange(event){
    this.friend = event;
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

}
