import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { ReportsComponent } from './components/reports/reports.component';
import { RequestsComponent } from './components/requests/requests.component';
import { FooterComponent } from './components/footer/footer.component';
import { BusComponent } from './components/bus/bus.component';
import { ParcelinfoComponent } from './components/parcelinfo/parcelinfo.component';

const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'map', component:MapComponent},
  {path:'transportation', component:BusComponent},
  {path:'requests',component:RequestsComponent},
  {path:'parcelinfo',component:ParcelinfoComponent},
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
    ParcelinfoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
  ],
  providers: [
    MapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
