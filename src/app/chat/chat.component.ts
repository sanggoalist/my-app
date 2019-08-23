import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Person } from '../models/person';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {read: ElementRef, static: true}) private myScrollContainer: ElementRef;
  persons: any[] =[];
  user: User;
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
    var id = 0;
    this.databaseService.getData<Message>("users/"+id+"/message").subscribe(res =>{
      console.log(res)
    })
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  handleClick(){
    this.messages.push({id: 1, message:  "Yes sure, why not?"});
    // this.databaseService.saveData({age: 111, name: "Sang"});
   this.databaseService.getData<User>("users").subscribe(res =>{
     console.log(res)
   });
    console.log(this.user)
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
