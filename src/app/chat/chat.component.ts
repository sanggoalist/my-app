import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Person } from '../models/person';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {read: ElementRef, static: true}) private myScrollContainer: ElementRef;
  persons: any[] =[];
  user: User;
  messagess: Message[] = [];
  forM = 'YYYY-MM-DD HH:mm:ss';
  text;
  id = 0;
  messages: any[] = [
    {id: 1, message: "Trước đó, tháng 5/2019, Ủy ban Kiểm tra Trung ương kết luận, Ban thường vụ Tỉnh ủy Sơn La đã chấp hành không nghiêm nguyên tắc tập trung dân chủ và quy chế làm việc, thiếu lãnh đạo, chỉ đạo, kiểm tra, giám sát, để xảy ra một số vi phạm, khuyết điểm trong công tác cán bộ, thực hiện một số dự án đầu tư xây dựng, nhất là công tác tổ chức kỳ thi trung học phổ thông (THPT) quốc gia năm 2018."},
    {id: 1, message:  "Yes sure, why not?"},
    {id: 2, message:  "OK I nknow"},
    {id: 2, message: "Trước đó, tháng 5/2019, Ủy ban Kiểm tra Trung ương kết luận, Ban thường vụ Tỉnh ủy Sơn La đã chấp hành không nghiêm nguyên tắc tập trung dân chủ và quy chế làm việc, thiếu lãnh đạo, chỉ đạo, kiểm tra, giám sát, để xảy ra một số vi phạm, khuyết điểm trong công tác cán bộ, thực hiện một số dự án đầu tư xây dựng, nhất là công tác tổ chức kỳ thi trung học phổ thông (THPT) quốc gia năm 2018."},
    {id: 1, message:  "OK I nknow"},
    {id: 1, message:  "OK I nknow"},
    {id: 1, message:  "OK I nknow"},
  ]
  constructor(public databaseService: DatabaseService,
    private  spinnerService: SpinnerOverlayService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.databaseService.getData<Person>("persons").subscribe(res =>{
      this.persons = res;
      this.spinnerService.hide();
      this.scrollToBottom();
    });
    // this.databaseService.getData<User>("users").subscribe(res =>{
    //   console.log(res)

    // });


    // var str = '2019-08-26 15:29:48';
    // var cn = moment.now();
    // var dat1 = moment(cn);
    // var dat2 = moment(str);
    // console.log(dat2.isBefore(dat1));
    this.databaseService.getData<Message>("users/"+this.id+"/message").subscribe(res =>{
      this.messagess = res;
    })
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  handleClick(){
    console.log(this.text)
    var mes = new Message();
    mes.message = this.text;
    mes.send_at = moment(moment.now()).format(this.forM).toString();
    mes.user_id = this.id;
    this.databaseService.saveMessage("users/"+this.id+"/message", mes).then(res =>{
        if (res){
          // this.messagess.push(mes);
        }
    });
    // this.messages.push({id: 1, message:  "Yes sure, why not?"});
    // this.databaseService.saveData({age: 111, name: "Sang"});
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
