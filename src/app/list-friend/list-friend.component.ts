import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Person } from '../models/person';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit, OnChanges {

  users: User[] =[];
  @Input() userList: User[];
  currentIndex: number;
  @Input() show: boolean;

  @Output() cl = new EventEmitter();
  @Output() friendChange = new EventEmitter();
  le = 0;
  constructor(public databaseService: DatabaseService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.show)
    this.users = this.userList;
  }

  ngOnChanges(event){
    console.log(event)
    if (event.userList != null){
    event.userList.currentValue.forEach(element => {
          if (element.user_id == this.currentIndex){
              this.friendChange.emit(element)
          }
    });
    }    

  }

  clickOnFriend(event, index){
    this.currentIndex = index;
    this.cl.emit(index);
  }
  logoutHandle(){
      this.cookieService.delete("sang-app-chat");
      this.router.navigate(["/login"]);
  }

}
