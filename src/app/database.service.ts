import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Person } from './models/person';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Message } from './models/message';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import * as moment from 'moment';

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

  login(nickname: string):  Promise<DataSnapshot>{
    var ref = this.db.database.ref().child("users");
    return ref.orderByChild("nickname").equalTo(nickname).once('value');
  }

  getUser(userId: number): Observable<User>{
    var ref = this.db.database.ref().child("users").child(userId.toString());
    return this.db.object<User>("users/"+ userId).valueChanges();
  }

  saveMessage(data: string, mes: Message) {
    return this.db.database.ref(data).child("3").set(mes);
  }
  updateMessage(data: string, mes: Message[]) {
    return this.db.database.ref(data).child("message").set(mes);
  }
  sendMessage(userId: number, targetUserId: number, mes: Message[]){
    var ref = this.db.database.ref()
                                    .child("users")
                                      .child(userId.toString())
                                        .child("message")
                                          .child(targetUserId.toString());
     return ref.set(mes);                                   
  }
  sendTargetMessage(userId: number, targetUserId: number, mes: Message[]){
    var ref = this.db.database.ref()
                                    .child("users")
                                      .child(targetUserId.toString())
                                        .child("message")
                                          .child(userId.toString());
     return ref.set(mes);                                   
  }

  // checkNickname(nickname: string){
  //   var ref = this.db.database.ref().child("users");
  //   return ref.orderByChild("nickname").equalTo(nickname).on("")
  // }
  createUser(user: User): Promise<any> {
    const m = moment.now();
    const userId = moment(m).unix().toString();
    user.user_id = Number.parseInt(userId);
     var ref = this.db.database.ref().child("users").child(userId);
     return ref.set(user);
  }
  getNextIndex() {
    return this.db.database.ref().child("users");
  }
}
