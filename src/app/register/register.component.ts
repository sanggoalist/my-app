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
import { Info } from '../models/info';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  hide = true;
  submitForm: FormGroup;
  index: number = null;
  isProcess = false;
  constructor(private route: ActivatedRoute, private router: Router, 
    private formBuilder: FormBuilder, private database: DatabaseService,
    public dialog: MatDialog,
    private cookieService: CookieService,
    public localStore: LocalStorageService) { }

  ngOnInit() {
    this.localStore.clear();
    this.database.getNextIndex().once("value", res =>{
        this.index = res.numChildren();
    });
    this.submitForm = this.formBuilder.group({
      nickname: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
      repassword: ['',[Validators.required]],
      display_name: ['',[Validators.required]]
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
        if (res.val() != null){
          this.openDialog('Nickname has been taken. Please use another nickname', 2);
        }else{
            var nickname = this.submitForm.value.nickname;
            var password = this.submitForm.value.password;
            var display_name = this.submitForm.value.display_name;
            var user: User = new User();
            user.auth = new AuthItem();
            user.auth.password = password;
            user.forbidden = 0;
            user.nickname = nickname;
            user.role = 0;
            var m = moment.now();
            var userId = moment(m).unix();
            user.user_id = userId;
            var info: Info = {
              display_name: display_name,
              nickname: nickname,
              user_id: userId
            }
            Promise.all([
              this.database.createUser(user),
              this.database.createInfo(info)
            ]).then(res =>{
              this.isProcess = false;
                this.openDialog('Success!!! The user is has been created!', 3);
                this.dialog.afterAllClosed.subscribe(res =>{
                  this.router.navigate(["/login"]);
                })
            }).catch(err =>{
              if(err){
                this.openDialog('There is something when wrong', 2);
                return;
              }
            });
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

  openDialog(mes: string, type: number): void {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      width: '250px',
      data: {code: type, name: mes}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
