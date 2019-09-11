import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

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
      password: ['',[Validators.required]],
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
  }
  onChange(event: string){
    if (this.submitForm.controls.password.value != event){
      this.submitForm.controls.repassword.setErrors({notSame: true});
    }else{
      this.submitForm.controls.repassword.setErrors(null);
    }
  }

}
