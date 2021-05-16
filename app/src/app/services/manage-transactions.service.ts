import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { ManageUsersService } from './manage-users.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageTransactionsService {
  collection = "daily-transactions"

  constructor(public db: AngularFirestore, public userService: ManageUsersService, public auth: AuthService) { }

  getAll() {
    return this.db.collection(this.userService.collection).doc(this.auth.getUid()?.toString()).collection(this.collection).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }

  getDataByMonth(monthYear:any) {
    return this.db.collection(this.userService.collection).doc(this.auth.getUid()?.toString()).collection(this.collection,ref=>ref.where("monthYear","==",monthYear)).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    )
  }
}
