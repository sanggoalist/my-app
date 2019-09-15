import { Component, OnInit, OnChanges } from '@angular/core';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { CookieService } from 'ngx-cookie-service';
import { InfoAuthen } from '../models/infoAuth';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { Router } from '@angular/router';

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
  userList: User[] = [];
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService,
    private cookieService: CookieService,
    public dialog: MatDialog,
    private router: Router ) { }

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
    var user = JSON.parse(this.cookieService.get("sang-app-chat"));
    this.databaseService.getData<User>("users").subscribe(res =>{
        if (this.userList.length !== 0){
          this.userList = [];
        }
        res.forEach(element => {
          if (element.friends.includes(user.user_id)){
            this.userList.push(element)
          }
        });
        this.userId = user.user_id;
        this.spinnerService.hide();
    })
  }
  ngOnChanges(event){
    console.log(event)
  }
  onCl(event){
    this.show = true;
    this.friend = this.userList.find(user => {return user.user_id === event;});
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
