import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { CookieService } from 'ngx-cookie-service';
import { WrapperRes } from '../models/wrapperRes';
import { LocalStorageService } from '../local-storage.service';
import { Mes } from '../models/mes';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { MesssageMapChangeAction } from '../redux/actions/messageMap';
import { FriendsChangeAction } from '../redux/actions/friends';
import { MessagesChangeAction } from '../redux/actions/messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isProcess = false;
  private isCorrect = false;
  submitted = false;
  hide = true;
  submitForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, 
            private formBuilder: FormBuilder, private database: DatabaseService,
            public dialog: MatDialog,
            private cookieService: CookieService,
            public localStore: LocalStorageService,
            public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      nickname: ['',Validators.required],
      password: ['',[Validators.required]]
    });
  }
  submitedHandle(){
    // this.isClick = true;
    this.submitted = true;
    console.log(this.submitForm)
    if (this.submitForm.invalid){
      return;
    }
    this.isProcess = true;
    this.database.login(this.submitForm.value.nickname).then((res) =>{
      this.isProcess = false;
        if (res.exportVal() == null){
          this.openDialog("Wrong Nickname or Password");
          return;
        }
        else{          
          let user: User = null;
          if (res.exportVal().length == undefined){
            user =  <User>res.exportVal()[Object.keys(res.exportVal())[0]];
          }else{
            res.exportVal().forEach(element => {
              if (element){
               user =  <User>element;
              }
            });
          }
          if (user != null){
            if (this.checkPassword(user, this.submitForm.value.password)){
              if (this.cookieService.check("sang-app-chat")){
                this.cookieService.delete("sang-app-chat");
              }
                var ob = {user_id: user.user_id}
                this.cookieService.set("sang-app-chat", JSON.stringify(ob), 1, '/');
                // this.database.getData<Mes>("users/"+user.user_id + "/mes").subscribe(res =>{
                //   var map:Map<number,number> = new Map<number,number>();
                //   res.forEach(r =>{
                //     map.set(r.target_id, r.message_id);
                //   });
                //   this.store.dispatch(new MessagesChangeAction(map));
                //   this.localStore.setItem("messageIdMap", res);
                // })
                // this.database.getData<number>("users/"+user.user_id + "/friends").subscribe(res =>{
                //   this.localStore.setItem("friends",res);
                //   this.store.dispatch(new FriendsChangeAction(res));
                // });
              this.router.navigate(['/home']);
            }
            else
            this.openDialog("Wrong Nickname or Password");
            return;
          } else{
            this.openDialog("Error");
          }  


        }
    })

  }

  private checkPassword(user: User, password: string){
    if (user.auth.password == password)
    return true;
    else
    return false;
  }

  openDialog(mes: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: 0, name: mes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
