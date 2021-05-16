import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from './common.service';
import { ManageUsersService } from './manage-users.service';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DailyTransactionsService {
  collection = "daily-transactions"
  constructor(public db: AngularFirestore, public storage: StorageService, public router: Router, public common: CommonService, public userService: ManageUsersService) { }

  add(data: any, uid: any, docId: any) {
    let timestamp = firebase.firestore.Timestamp.now()
    data.timestamp = timestamp
    return this.db.collection(this.userService.collection).doc(uid).collection(this.collection).doc(docId).set(data).then(res => {

    }).catch(err => {
      this.common.showToast("error", "", err)
      return err;
    }).finally(() => {
      // this.common.showToast("success", "", "Added Successful!")
    })
  }

  update(fee: number, id: any) {
    return this.db.collection("fee").doc(id).update({ fee: fee })
  }

  getFee(id: any) {
    return this.db.collection("fee").doc(id).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
  }

}
