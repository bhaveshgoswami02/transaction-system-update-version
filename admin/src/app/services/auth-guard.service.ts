import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private auth:AuthService,public router:Router) { }
  canActivate():boolean{
    if(this.auth.getEmail() == environment.email){
      return true
    }
    else{
      this.router.navigateByUrl("/auth")
      return false
    }
  }
}
