import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { MapService } from './services/map.service';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';
import { BusService } from './services/bus.service'
import { AuthGuard } from './guards/auth.guard';
import { EmpGuard } from './guards/emp.auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusComponent } from './components/bus/bus.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ParcelinfoComponent } from './components/parcelinfo/parcelinfo.component';
import { PaymentComponent } from './components/payment/payment.component';
import { DmMapComponent } from './components/dm/dm-map/dm-map.component';
import { DmReportsComponent } from './components/dm/dm-reports/dm-reports.component';
import { DmRequestsComponent } from './components/dm/dm-requests/dm-requests.component';
import { ReportsService } from './services/reports.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'report', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'request', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'services/transportation', component: BusComponent },
  { path: 'services/payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'services/parcelinfo', component: ParcelinfoComponent, canActivate: [AuthGuard] },
  { path: 'dm/map', component: DmMapComponent, canActivate: [AuthGuard,EmpGuard] },
  { path: 'dm/requests', component: DmRequestsComponent, canActivate: [AuthGuard,EmpGuard] },
  { path: 'dm/reports', component: DmReportsComponent, canActivate: [AuthGuard,EmpGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MapComponent,
    ReportsComponent,
    RequestsComponent,
    FooterComponent,
    BusComponent,
    LoginComponent,
    RegisterComponent,
    ParcelinfoComponent,
    PaymentComponent,
    DmMapComponent,
    DmReportsComponent,
    DmRequestsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    CarouselModule
  ],
  providers: [
    MapService,
    AuthService,
    NavbarService,
    BusService,
    AuthGuard,
    EmpGuard,
    ReportsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
