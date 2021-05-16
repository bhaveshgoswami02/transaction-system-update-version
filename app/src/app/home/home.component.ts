import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ManageTransactionsService } from '../services/manage-transactions.service';
import { ManageUsersService } from '../services/manage-users.service';

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
  constructor(public transaction: ManageTransactionsService, public userService: ManageUsersService, public auth: AuthService) { }

  ngOnInit(): void {
    this.getUserData()
    this.getAllTransaction()

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
        this.getGraphData(transaction)
        this.getTotalOfNeto(transaction.neto)
      });
      this.neto = this.neto + this.userData.deposit
      console.log("all transactions", this.allTransaction)
    })
  }

  onSelectDate(event: any) {
    console.log(event.target.value)
    this.netoData = []
    this.allDate = []
    let date = event.target.value.toString()
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
      // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      labels: this.allDate,
      datasets: [
        {
          label: 'Neto',
          data: this.netoData
        },
        // {
        //   label: 'Second Dataset',
        //   data: [28, 48, 40, 19, 86, 27, 90]
        // }
      ]
    }
  }

  getTotalOfNeto(neto: number) {
    this.neto = this.neto + neto
    console.log("total neto", this.neto)
  }

  logout() {
    this.auth.logOut()
  }

  getMonths(data: any) {
    // this.allMonth = data.filter((a:any, b:any) => array.indexOf(a) === b)
    var resultarray = data.uniq((data: any) => {
      return data.id && data.name;
    });
    console.log(resultarray)
  }
}