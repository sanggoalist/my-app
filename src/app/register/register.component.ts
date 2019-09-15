import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';
import { User } from '../models/user';
import { AuthItem } from '../models/authItem';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  hide = true;
  submitForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, 
    private formBuilder: FormBuilder, private database: DatabaseService,
    public dialog: MatDialog,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.submitForm = this.formBuilder.group({
      nickname: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repassword: ['',[Validators.required]]
    });
  }
  submitedHandle(){
    // this.isClick = true;
    this.submitted = true;
    console.log(this.submitForm)
    if (this.submitForm.invalid){
      return;
    }
    this.database.login(this.submitForm.value.nickname).then((res) =>{
        if (res.val() != null){
          this.openDialog('Nickname has been taken. Please use another nickname');
        }else{
          var number = 0;
          this.database.getData("users").subscribe(res =>{
            var users: User[] = res;
            var nickname = this.submitForm.value.nickname;
            var password = this.submitForm.value.password;
            var user: User = new User();
            user.auth = new AuthItem();
            user.auth.password = password;
            user.forbidden = 0;
            user.friends = [0];
            user.nickname = nickname;
            user.role = 0;
            var m = moment.now();
            var userId = moment(m).unix();
            user.user_id = userId;
            users.push(user);
            console.log(users)
            this.database.createUser(users).then(res =>{
              if(res){
                this.router.navigate(["/login"]);
                return;
              }
            }).catch(err =>{
              if(err){
                this.openDialog('There is something when wrong');
                return;
              }
            });
          })
        }
    })
  }
  onChange(event: string){
    if (this.submitForm.controls.password.value != event){
      this.submitForm.controls.repassword.setErrors({notSame: true});
    }else{
      this.submitForm.controls.repassword.setErrors(null);
    }
  }

  openDialog(mes: string): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: 2, name: mes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
