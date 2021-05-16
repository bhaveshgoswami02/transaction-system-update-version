import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() name: any;

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
    console.log("user name",this.name)
  }

  logout(){
    this.auth.logOut()
  }

}
