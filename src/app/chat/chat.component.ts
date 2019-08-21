import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] =[]
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.databaseService.getData().subscribe(res =>{
      this.messages = res;
      this.spinnerService.hide();
    });
  }

}
