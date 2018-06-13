import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { MapService } from './services/map.service';
import { AuthService } from './services/auth.service';
import { NavbarService } from './services/navbar.service';
import { BusService } from './services/bus.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusComponent } from './components/bus/bus.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'map', component:MapComponent},
  {path:'transportation', component:BusComponent},
  {path:'payment', component:PaymentComponent}
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}
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
    PaymentComponent
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule,
    CarouselModule
  ],
  providers: [
    MapService,
    BusService
    AuthService,
    NavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
