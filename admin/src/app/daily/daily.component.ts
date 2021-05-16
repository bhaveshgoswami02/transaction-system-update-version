import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';
import { DailyTransactionsService } from '../services/daily-transactions.service';
import { ManageUsersService } from '../services/manage-users.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  allUsers:any = []
  fee:number = 0
  constructor(public userService: ManageUsersService, public dailyTransaction: DailyTransactionsService, public common: CommonService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsers()
    this.getFee()
  }

  getUsers() {
    this.common.showLoader()
    this.userService.getAll().subscribe(res => {
      this.allUsers = res
      console.log("alll users", this.allUsers)
      this.common.stopLoader()
    })
  }

  onSubmit(data: NgForm) {
    // this.common.showLoader()
    let docId:any = this.datepipe.transform(data.value.date, 'yyyy-MM-dd');
    let monthYear = docId.slice(0,7)
    console.log("docId",docId)
    console.log("monthYear",monthYear)
    this.allUsers.forEach((user:any)=>{
      if(user.deposit) {
        let bruto = user.deposit * data.value.value/100
        let neto = bruto - data.value.fee
        let newData = {date:data.value.date,bruto:bruto,neto:neto,fee:data.value.fee,monthYear:monthYear}
        this.dailyTransaction.add(newData,user.id,docId)
        this.updateFee(data.value.fee)
      }
    })
    this.common.stopLoader()
    this.common.showToast("success","","Transaction completed")
  }

  getFee() {
    this.dailyTransaction.getFee(environment.feeId).subscribe(res=>{
      this.fee = res.fee
    })
  }

  updateFee(fee:number) {
    this.dailyTransaction.update(fee,environment.feeId)
  }

}
