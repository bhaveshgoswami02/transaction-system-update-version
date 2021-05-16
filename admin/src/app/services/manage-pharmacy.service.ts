import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ManagePharmacyService {
  collection = "pharmacy"
  constructor(public db: AngularFirestore, public storage: StorageService, public router: Router, public common: CommonService) { }

  add(data:any, Img:any) {
    this.common.showLoader()
    return this.db.collection(this.collection).add(data).then(res => {
      let path = this.collection + "/" + res.id + "/" + this.collection
      if (Img) {
        this.storage.upload(path, Img).then(imgUrl => {
          this.update(res.id, { imgUrl: imgUrl })
        }).catch(err => {
          console.log(err)
        })
      }
      return res;
    }).catch(err => {
      this.common.showToast("error", "", err)
      return err;
    }).finally(() => {
      this.common.showToast("success", "", "Added Successful!")
      this.common.stopLoader()
    })
  }

  getAll() {
    return this.db.collection(this.collection).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getSingle(id:string) {
    return this.db.collection(this.collection).doc(id).valueChanges()
  }

  update(id:string, data:any, img?:any) {
    this.common.showLoader()
    let path = this.collection + "/" + id + "/" + this.collection;
    if (img) {
      return this.storage.upload(path, img).then((newUrl:any) => {
        this.update(id, { imgUrl: newUrl, ...data });
      }).catch(err => {
        this.common.showToast("error", "Error", err)
      }).finally(() => {
        this.common.stopLoader()
        this.router.navigateByUrl("/"+this.collection)
      })
    } else {
      return this.db.collection(this.collection).doc(id).update(data).then((res:any) => {
        return res
      }).catch(err => {
        this.common.showToast("error", "Error", err)
        return err;
      }).finally(() => {
        this.router.navigateByUrl("/"+this.collection)
        this.common.showToast("success", "Successful", "Banner Updated!")
        this.common.stopLoader()
      })
    }
  }

  delete(id:string) {
    this.common.showLoader()
    let path = this.collection + "/" + id + "/" + this.collection;
    return this.db.collection(this.collection).doc(id).delete().then(res => {
      this.storage.deleteImage(path);
      return res
    }).catch(err => {
      console.log(err)
      this.common.showToast("error", "", err)
    }).finally(() => {
      this.common.showToast("error", "", "Deleted!")
      this.common.stopLoader()
    })
  }

}
