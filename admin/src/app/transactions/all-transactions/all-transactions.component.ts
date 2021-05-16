import { Component, OnInit } from '@angular/core';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {
  allData:any = []
  constructor(public userService:ManageUsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAll().subscribe(res => {
      this.allData = res
      console.log("allData", this.allData)
    })
  }

}
