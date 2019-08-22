import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SpinnerOverlayService } from '../service/spinner-overlay.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  persons: any[] =[];
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
    this.databaseService.getData().subscribe(res =>{
      this.persons = res;
      this.spinnerService.hide();
    });
  }

}
