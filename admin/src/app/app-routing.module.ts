import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { DailyComponent } from './daily/daily.component';
import { AllPharmacyComponent } from './manage-pharmacy/all-pharmacy/all-pharmacy.component';
import { ManagePharmacyComponent } from './manage-pharmacy/manage-pharmacy.component';
import { SinglePharmacyComponent } from './manage-pharmacy/single-pharmacy/single-pharmacy.component';
import { AllUsersComponent } from './manage-users/all-users/all-users.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AllTransactionsComponent } from './transactions/all-transactions/all-transactions.component';
import { SingleTransactionComponent } from './transactions/single-transaction/single-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';


const routes: Routes = [
  // { path: '', component: ManageUsersComponent, canActivate: [AuthGuardService] },
  // {
  //   path: 'pharmacy', component: ManagePharmacyComponent, canActivate: [AuthGuardService], children: [
  //     { path: '', component: AllPharmacyComponent },
  //     { path: 'add', component: SinglePharmacyComponent },
  //     { path: 'edit/:id', component: SinglePharmacyComponent }
  //   ]
  // },
  {
    path: '', component: TransactionsComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: AllTransactionsComponent },
      { path: 'add-transaction', component:SingleTransactionComponent}
    ]
  },
  {
    path: 'users', component: ManageUsersComponent, canActivate: [AuthGuardService], children: [
      { path: '', component: AllUsersComponent },
    ]
  },
  { path: 'daily', component: DailyComponent, canActivate: [AuthGuardService] },
  {
    path: 'auth', component: AuthComponent, children: [
      { path: '', component: SigninComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
