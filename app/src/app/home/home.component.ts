import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ManageTransactionsService } from '../services/manage-transactions.service';
import { ManageUsersService } from '../services/manage-users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allTransaction: any = []
  userData: any = { withdraw: 0, deposit: 0 }
  data: any
  options: any;
  allDate: any = []
  neto: number = 0
  netoData: any = []
  allMonth: any = []
  cols = [
    { field: 'id', header: 'Date' },
    { field: 'bruto', header: 'Bruto' },
    { field: 'fee', header: 'Fee' },
    { field: 'neto', header: 'Neto' },
  ];
  currentMonth:any = ""
  constructor(public transaction: ManageTransactionsService, public userService: ManageUsersService, public auth: AuthService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getUserData()
    this.getAllTransaction()
    let todayDate = new Date()
    let docId:any = this.datepipe.transform(todayDate, 'yyyy-MM-dd');
    this.currentMonth = docId.slice(0,7)
    console.log(this.currentMonth)
    this.onSelectDate(this.currentMonth)
    this.options = {
      title: {
        display: false,
        text: '',
        fontSize: 16
      },
      legend: {
        // position: 'bottom'
      }
    };
  }

  getUserData() {
    this.userService.getSingle().subscribe(res => {
      this.userData = res
      console.log("user data", this.userData)
      if (!this.userData.deposit) {
        this.userData.deposit = 0
      }
      if (!this.userData.withdraw) {
        this.userData.withdraw = 0
      }
    })
  }

  getAllTransaction() {
    this.transaction.getAll().subscribe(res => {
      this.allTransaction = res
      this.allTransaction.forEach((transaction: any) => {
        // this.getGraphData(transaction)
        this.getTotalOfNeto(transaction.neto)
      });
      this.neto = this.neto + this.userData.deposit
      console.log("all transactions", this.allTransaction)
    })
  }

  onSelectDate(event: any) {
    this.netoData = []
    this.allDate = []
    this.data = {
      labels: this.allDate,
      datasets: [
        {
          label: 'Neto',
          data: this.netoData
        },
      ]
    }
    let date:string = ""
    if(!event.target) {
      date = this.currentMonth
    }
    else
    {
      date = event.target.value.toString()
    }
    if(!date) {
      date = this.currentMonth
    }
    console.log(date)
    this.transaction.getDataByMonth(date).subscribe(res => {
      console.log(res)
      res.forEach(transaction => {
        this.getGraphData(transaction)
      })
    })
  }

  getGraphData(data: any) {
    if (data.bruto) {
      this.netoData.push(data.neto)
      console.log(this.netoData)
    }
    if (data.id) {
      this.allDate.push(data.id)
      console.log(this.allDate)
    }
    this.data = {
      labels: this.allDate,
      datasets: [
        {
          label: 'Neto',
          data: this.netoData
        },
      ]
    }
    console.log(this.data)
  }

  getTotalOfNeto(neto: number) {
    this.neto = this.neto + neto
    console.log("total neto", this.neto)
  }

  logout() {
    this.auth.logOut()
  }

}