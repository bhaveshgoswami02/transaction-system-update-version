import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent,canActivate:[AuthGuardService]},
  { path: 'chart', component: ChartComponent},
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
