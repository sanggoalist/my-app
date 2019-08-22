import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  persons: any[] =[];
  messages: any[] = [
    {id: 1, message: "This is my first test"},
    {id: 1, message:  "Yes sure, why not?"},
    {id: 2, message:  "OK I nknow"}
]
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.databaseService.getData().subscribe(res =>{
      this.persons = res;
      this.spinnerService.hide();
    });
  }

}
