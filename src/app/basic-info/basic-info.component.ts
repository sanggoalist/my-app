import { Component, OnInit } from '@angular/core';
import { Person } from '../models/person';
import {UserService} from '../user.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject,  } from 'angularfire2/database';
import { DatabaseService } from '../database.service';
@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {
  peoples: Person[] = [];
  titles: string[] = ['name', 'age'];

  public per: Person[] = [];
  
  constructor(public userService: UserService,
    public databaseService: DatabaseService, 
    private  spinnerService: SpinnerOverlayService,
    private db: AngularFireDatabase) { 
    this.spinnerService.show();
    this.databaseService.getData().subscribe(res =>{
      this.peoples = res;
      this.spinnerService.hide();
    });
  }

  ngOnInit() {
  }

}
