import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnChanges {
  userId = 0;
  show = false;
  friendId = null;
  friend: User;
  userList: User[] = [];
  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getData<User>("users").subscribe(res =>{
        if (this.userList.length !== 0){
          this.userList = [];
        }
        console.log(res)
        res.forEach(element => {
          if (element.friends.includes(this.userId)){
            this.userList.push(element)
          }
        });
    })
  }
  ngOnChanges(){
    console.log("this change")
  }
  onCl(event){
    this.show = true;
    this.friend = this.userList.find(user => {return user.user_id === event;});
  }

}
