import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Person } from '../models/person';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit, OnChanges {

  users: User[] =[];
  @Input() userList: User[];

  @Input() show: boolean;

  @Output() cl = new EventEmitter();
  le = 0;
  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
    console.log(this.show)
    this.users = this.userList;
  }

  ngOnChanges(){
    console.log("this change")
  }

  clickOnFriend(event, index){
    this.cl.emit(index);
  }

}
