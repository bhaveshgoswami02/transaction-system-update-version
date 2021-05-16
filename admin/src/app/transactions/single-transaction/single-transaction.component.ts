import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-single-transaction',
  templateUrl: './single-transaction.component.html',
  styleUrls: ['./single-transaction.component.scss']
})
export class SingleTransactionComponent implements OnInit {
  allUsers:any = []

  constructor(public userService:ManageUsersService,public common:CommonService,public router:Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAll().subscribe(res => {
      this.allUsers = res
      console.log("allData", this.allUsers)
    })
  }

  onSubmit(data:NgForm) {
    this.common.showLoader()
    let uid = data.value.uid
    let newData = {}
    if(data.value.type == 'deposit') {
      newData = {deposit:data.value.amount}
    }
    else
    {
      newData = {withdraw:data.value.amount}
    }
    this.userService.updateUser(uid,newData).then(res=>{
      this.common.showToast("success","","Transaction Successful!")
      this.router.navigateByUrl("/")
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.stopLoader()
    })
  }
}
