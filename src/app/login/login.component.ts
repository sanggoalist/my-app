import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { User } from '../models/user';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isProcess = false;
  private isCorrect = false;
  submitted = false;
  hide = true;
  submitForm: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router, 
            private formBuilder: FormBuilder, private database: DatabaseService,
            public dialog: MatDialog,
            private cookieService: CookieService) {
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
    // if (this.isClick){
    //   this.isClick = false;
    //   return;
    // }
    // this.isClick = true;
    this.isProcess = true;
    this.database.login(this.submitForm.value.nickname).then((res) =>{
      this.isProcess = false;
        if (res.val() == null){
          this.openDialog("Wrong Nickname or Password");
          return;
        } else if (res.val().length > 1){
          this.openDialog("Error");
          return;
        }
        else{
          let user =  <User>res.val()[0];
          console.log(user)
          if (this.checkPassword(user, this.submitForm.value.password)){
            if (this.cookieService.check("sang-app-chat")){
              this.cookieService.delete("sang-app-chat");
            }
              var ob = {user_id: user.user_id}
              this.cookieService.set("sang-app-chat", JSON.stringify(ob), 4, '/');
            this.router.navigate(['/chat-page']);
          }
          else
          this.openDialog("Wrong Nickname or Password");
          return;
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
