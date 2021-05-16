import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HeaderComponent } from './share/header/header.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManagePharmacyComponent } from './manage-pharmacy/manage-pharmacy.component';
import { AllPharmacyComponent } from './manage-pharmacy/all-pharmacy/all-pharmacy.component';
import { SinglePharmacyComponent } from './manage-pharmacy/single-pharmacy/single-pharmacy.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AllUsersComponent } from './manage-users/all-users/all-users.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AllTransactionsComponent } from './transactions/all-transactions/all-transactions.component';
import { SingleTransactionComponent } from './transactions/single-transaction/single-transaction.component';
import { DailyComponent } from './daily/daily.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { DatePipe } from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ManageUsersComponent,
    ManagePharmacyComponent,
    AllPharmacyComponent,
    SinglePharmacyComponent,
    AuthComponent,
    SigninComponent,
    AllUsersComponent,
    TransactionsComponent,
    AllTransactionsComponent,
    SingleTransactionComponent,
    DailyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule, // required animations module
    NgxUiLoaderModule,
    ToastrModule.forRoot(), // ToastrModule added
    CalendarModule,
    DropdownModule,
    DialogModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
