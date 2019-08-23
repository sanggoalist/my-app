import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Person } from './models/person';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getData<T> (data: string): Observable<T[]>{
    return  this.db.list<T>(data).valueChanges();
  }

  saveData (person: Person): void{
    this.db.list<Person>("persons").push(person).then(res =>{
        console.log(res);
    });
  }
  createUser(user: User): void {
    user.message.message_id = this.db.createPushId();
    this.db.list<User>("users").push(user).then(res =>{
      console.log(res);
    })
  }
}
