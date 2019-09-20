import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Person } from './models/person';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { Message } from './models/message';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import * as moment from 'moment';
import { WrapperMessage } from './models/wrapperMessage';
import { Mes } from './models/mes';
import { Notifications } from './models/notifications';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getData<T> (data: string): Observable<T[]>{
    return  this.db.list<T>(data).valueChanges();
  }

  getList(messageId: string){
    var ref = this.db.database.ref().child(messageId);
    return ref;
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
  // sendMessage(userId: number, targetUserId: number, mes: Message[]){
  //   var ref = this.db.database.ref()
  //                                   .child("users")
  //                                     .child(userId.toString())
  //                                       .child("message")
  //                                         .child(targetUserId.toString());
  //    return ref.set(mes);                                   
  // }
  sendTargetMessage(userId: number, targetUserId: number, mes: Message[]){
    var ref = this.db.database.ref()
                                    .child("users")
                                      .child(targetUserId.toString())
                                        .child("message")
                                          .child(userId.toString());
     return ref.set(mes);                                   
  }

  sendMessage(message: WrapperMessage, messageId: string){
    var ref = this.db.database.ref()
                                .child("messages")
                                    .child(messageId);
    return ref.push(message);
  }

  setMessageIdOnUser(userId: number, targetId: number, messageId: number){
    var mes: Mes = {
      message_id: messageId.toString(),
      target_id: targetId
    }
    var ref = this.db.database.ref()
                                    .child("users").child(userId.toString()).child("mes");
    return ref.push(mes);
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

  getMessageList(userId: number, targetId: number){
    var ref = this.db.database.ref().child("messages");
    return ref.orderByChild("sender_id")
              
  }
  searchFriend(text: string){
    var ref = this.db.database.ref().child("info");
    return ref.orderByChild("display_name").startAt(text).endAt(text + '\uf8ff');
  }
  addFriend(userId: number, friendList: Array<number>){
    var ref = this.db.database.ref().child("users").child(userId.toString()).child("friends");
    return ref.set(friendList);
  }

  addNotification(userId: number, notification: Notifications){
    var ref = this.db.database.ref().child("users").child(userId.toString()).child("notifications");
    return ref.push(notification);
  }
  removeNotification(userId: number,  notifications: Notifications[]){
    var ref = this.db.database.ref().child("users").child(userId.toString()).child("notifications");
    return ref.set(notifications);
  }

}
