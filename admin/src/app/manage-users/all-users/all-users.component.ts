import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  allData:any = []
  display: boolean = false;

  constructor(public userService: ManageUsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getAll().subscribe(res => {
      this.allData = res
      console.log("allData", this.allData)
    })
  }

  showModal() {
    this.display = true;
  }

  hideModal() {
    this.display = false;
  }

  onSubmit(data:NgForm) {
    console.log("user data",data.value)
    this.userService.createUser(data.value)
    this.hideModal()
    data.resetForm()
    this.getUsers()
  }

}
