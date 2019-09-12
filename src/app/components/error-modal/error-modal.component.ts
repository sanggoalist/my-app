import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialogData';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit {
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    if(this.data.code == 0){
      this.title = 'Login Failue!';
    } else if (this.data.code == 1){
      this.title = 'Login Session is Expired';
    } else if (this.data.code == 2){
      this.title = 'Nickname is used';
    }
  }

}
