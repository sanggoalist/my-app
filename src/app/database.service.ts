import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Person } from './models/person';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Message } from './models/message';

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

  saveMessage(data: string, mes: Message) {
    return this.db.database.ref(data).child("3").set(mes);
  }
  updateMessage(data: string, mes: Message[]) {
    return this.db.database.ref(data).child("message").set(mes);
  }
  // createUser(user: User): void {
  //   user.message.message_id = this.db.createPushId();
  //   this.db.list<User>("users").push(user).then(res =>{
  //     console.log(res);
  //   })
  // }
}
