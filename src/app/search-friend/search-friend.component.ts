import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DatabaseService } from '../database.service';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage.service';
import * as fromRoot from '../redux/reducers';
import { Info } from '../models/info';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notifications } from '../models/notifications';
import { CookieService } from 'ngx-cookie-service';
import { FriendListAcceptChangeAction } from '../redux/actions/friendListForAccept';
import * as moment from 'moment';

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.scss']
})
export class SearchFriendComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  users: Observable<Info[]>;
  userId;
  displayName;
  show = false;
  constructor(public databaseService: DatabaseService,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService) { }

  ngOnInit() {
    var user = JSON.parse(this.cookieService.get("sang-app-chat"));
    this.displayName = user.display_name;
    console.log(this.displayName)
    this.userId = user.user_id;
    this.users = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value === ''){
          return [];
        }
        var users: Info[] = [];
        this.databaseService.searchFriend(value).on("value", res => {
          users = [];
          res.forEach(r => {
            if (r.exportVal()["user_id"] != this.userId){
              users.push(r.exportVal());
            }
          });
          if (this.localStore.getItem("friends") != null){
            var a = <Array<number>>this.localStore.getItem("friends");
            this.store.select(fromRoot.getFriends).subscribe(friends =>{
              users.forEach(user =>{
                if (friends.includes(user.user_id)){
                  user.isFriend = true;
                }else{
                  user.isFriend = false;
                }
              })
            });
            this.store.select(fromRoot.getFriendListForAccept).subscribe(friends =>{
              users.forEach(friendInfo => {
                  if (friends.includes(friendInfo.user_id)){
                      friendInfo.waitingForFriend = true;
                  }else{
                    friendInfo.waitingForFriend = false;
                  }
              });
        });          
          }
        })
        return users;
      })
    );
  }
  mouseEnter(d: string){
    this.show = true;
  }
  mouseLeave(d: string){
    this.show = false;
  }
  onEnter(info: Info){
    if (info == null){
      return;
    }
    if(info.isFriend){
      return;
    }
    if (info.waitingForFriend){
      return;
    }
    var m = moment.now();
    var messageId = moment(m).unix();
    var notification: Notifications = {
      target_id: info.user_id,
      user_id: this.userId,
      type: 1,
      waiting: false,
      display_name: this.displayName,
      message_id: messageId
    }
    var friends = <Array<number>>this.localStore.getItem("friends");
    friends = (friends == null)?[]:friends;
    friends.push(info.user_id);

    Promise.all([
      this.databaseService.addFriendForAccept(this.userId, info.user_id),
      this.databaseService.addNotification(info.user_id, notification),
      this.databaseService.addFriend(this.userId, friends),
      this.databaseService.setMessageIdOnUser(this.userId, info.user_id, messageId),
    ]).then(res =>{
      this.openSnackBar("The request has been sent to "+ info.display_name +"!", "");
    }).catch(err =>{
      console.log(err)
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
