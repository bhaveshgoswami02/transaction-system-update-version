import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {
  collection = "users"
  constructor(public db: AngularFirestore, public storage: StorageService, public router: Router, public common: CommonService,public auth:AuthService) { }

  getAll() {
    return this.db.collection(this.collection).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getSingle() {
    return this.db.collection(this.collection).doc(this.auth.getUid()?.toString()).get().pipe(
      map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      })
    )
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
