import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore, public router: Router, public common: CommonService) {
    this.afAuth.authState.subscribe((res:any)=>{
      if(res) {
        if(res.uid){
          localStorage.setItem("uid",res.uid)
          localStorage.setItem("email",res.email)
        }
        else{
          localStorage.removeItem("uid")
          localStorage.removeItem("email")
          this.router.navigateByUrl("/auth")
        }
      }
      else
      {
        this.router.navigateByUrl("/auth")
      }
    })
    if(!this.getEmail()) {
      this.router.navigateByUrl("/auth")
    }
  }

   signIn(email:string,password:string){
     this.common.showLoader()
     console.log(email,password)
     return this.afAuth.signInWithEmailAndPassword(email,password).then((res:any)=>{
      localStorage.setItem("uid",res.user.uid)
      localStorage.setItem("email",res.user.email)
      this.router.navigateByUrl("/")
      return res.user.uid
     }).catch(err=>{
      // code to generate a notification alert of wrong credentials
      return err
    }).finally(()=>{
     this.common.stopLoader()
    })
   }

  //  isAuthenticated(){
  //   if(localStorage.getItem("uid")){
  //     if(this.getUid() == "YYycwGFeNXgrHx3mIqleClkVbpJ3"){
  //       return true
  //     }
  //   }
  //   else{
  //     return false
  //   }
  //  }

  logOut() {
    localStorage.removeItem("uid")
    localStorage.removeItem("email")
    this.router.navigateByUrl("/auth")
    // this.afAuth.signOut()
  }

  getUid() {
    return localStorage.getItem("uid")
  }

  getEmail() {
    return localStorage.getItem("email")
  }

  //  getProfile(){
  //    return this.db.collection("users").doc(this.getUid()).valueChanges()
  //  }

  //  updateProfile(profileInfo:{firstName:string,lastName:string,mobile:string,gender:string}){
  //    return this.db.collection("users").doc(this.getUid()).set(profileInfo).then(res=>{
  //      return res
  //    }).catch(err=>{
  //     return err
  //    })
  //  }


}
