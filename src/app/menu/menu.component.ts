import { Component, OnInit } from '@angular/core';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private  spinnerService: SpinnerOverlayService ) { }

  ngOnInit() {
    
  }


}
