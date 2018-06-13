import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusComponent } from './components/bus/bus.component';
import { BusService } from './services/bus.service';
import { PaymentComponent } from './components/payment/payment.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'map', component:MapComponent},
  {path:'transportation', component:BusComponent},
  {path:'payment', component:PaymentComponent}
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
