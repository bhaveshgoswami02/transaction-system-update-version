import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagePharmacyService } from 'src/app/services/manage-pharmacy.service';

@Component({
  selector: 'app-all-pharmacy',
  templateUrl: './all-pharmacy.component.html',
  styleUrls: ['./all-pharmacy.component.scss']
})
export class AllPharmacyComponent implements OnInit {
  allData:any = []

  constructor(public dataService: ManagePharmacyService, public router: Router) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.dataService.getAll().subscribe(res => {
      this.allData = res
      console.log("data",this.allData)
    })
  }

  delete(id:any) {
    this.dataService.delete(id)
  }

  add() {
    this.router.navigateByUrl("/" + this.dataService.collection + "/add")
  }

  edit(id:any) {
    this.router.navigateByUrl("/" + this.dataService.collection + "/edit/" + id)
  }

}
