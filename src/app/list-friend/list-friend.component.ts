import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Person } from '../models/person';
import { User } from '../models/user';
import { EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../redux/reducers';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency';
import { AmountChangeAction } from '../redux/actions/amount';
import { Info } from '../models/info';
import { LocalStorageService } from '../local-storage.service';
@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss']
})
export class ListFriendComponent implements OnInit, OnChanges {
  public amount$: Observable<number>;
  public currencyRates$: Observable<Currency[]>;
  users: User[] =[];
  @Input() userList: User[];
  currentIndex: number;
  @Input() show: boolean;
  amount: number = 0;
  @Output() cl = new EventEmitter();
  @Output() friendChange = new EventEmitter();
  infoList: Info[];
  le = 0;
  constructor(public databaseService: DatabaseService,
    private cookieService: CookieService,
    private router: Router,
    public store: Store<fromRoot.State>,
    public localStore: LocalStorageService) { 
      store.select(fromRoot.getAmountState).subscribe(res =>{
          this.amount = res;
      })
      this.currencyRates$ = store.select(fromRoot.getCurrnecyRates)
    }

  ngOnInit() {

    this.users = this.userList;
    this.store.select(fromRoot.getInfoListState).subscribe(res =>{
      this.infoList = res;
    });
  }

  ngOnChanges(event){
    console.log(event)
    // if (event.userList != null){
    // event.userList.currentValue.forEach(element => {
    //       if (element.user_id == this.currentIndex){
    //           this.friendChange.emit(element)
    //       }
    // });
    // }    

  }

  clickOnFriend(event, index){
    console.log(this.infoList)
    this.store.dispatch(new AmountChangeAction(index));
    // this.currentIndex = index;
    // this.cl.emit(index);
  }
  logoutHandle(){
      this.localStore.clear();
      this.show = false;
      this.cookieService.delete("sang-app-chat");
      this.router.navigate(["/login"]);
  }

}
