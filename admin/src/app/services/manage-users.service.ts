import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  collection = "users"
  constructor(public db: AngularFirestore, public afauth: AngularFireAuth, public storage: StorageService, public router: Router, public common: CommonService) { }

  createUser(data:any) {
    this.common.showLoader()
    let timestamp = firebase.firestore.Timestamp.now()
    data.timestamp = timestamp
    this.afauth.createUserWithEmailAndPassword(data.email, "123456").then((res:any) => {
      let uid = res.user.uid
      this.setUser(data, uid).then(res => {
        this.common.showToast("success", "", "User created Successful!")
        this.resetPassword(data.email)
      })
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  resetPassword(email:string) {
    this.common.showLoader()
    this.afauth.sendPasswordResetEmail(email).then(res => {
      this.common.showToast("success", "", "Reset Password Link sent successful on email!")
      this.router.navigateByUrl("/login")
      this.common.stopLoader()
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
      this.common.stopLoader()
    })
  }

  setUser(data:any, uid:string) {
    return this.db.collection(this.collection).doc(uid).set(data)
  }

  getAll() {
    return this.db.collection(this.collection).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getSingle(id:string) {
    return this.db.collection(this.collection).doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

  updateUser(id:string, data:any) {
    return this.db.collection(this.collection).doc(id).update(data)
  }

  delete(id:string) {
    this.common.showLoader()
    return this.db.collection(this.collection).doc(id).delete().then(res => {
      this.common.stopLoader()
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.showToast("error", "", "Deleted!")
      this.common.stopLoader()
    })
  }

}
