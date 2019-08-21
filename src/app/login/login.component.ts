import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private isClick = false;
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
  }
  handleClick(){
    // this.isClick = true;
    if (this.isClick){
      this.isClick = false;
      return;
    }
    this.isClick = true;
    this.router.navigate(['/menu']);
  }

}
