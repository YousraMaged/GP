import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportsService {

  constructor(
    public http: Http,
    public router: Router
  ) {}
  
  getReports() {
    return this.http.get('http://localhost:3000/api/Reports?access_token=' + localStorage.getItem('token'))
      .map(res => res);
  }

  addReport(report){
    return this.http.post('http://localhost:3000/api/Reports', report)
    .map(res => {
      res;
      this.router.navigate([this.router.url]);
    });
  }

  getUserReports(){
    return this.http.get('http://localhost:3000/api/Clients/'+ localStorage.getItem('userID') +'/reports')
    .map(res => res);
  }

  getReportsCount(){
    return this.http.get('http://localhost:3000/api/Clients/'+ localStorage.getItem('userID') +'/reports/count')
    .map(res => res);
  }

  searchReport(number){
    return this.http.get('http://localhost:3000/api/Reports/getReportByNumber?Number='+number)
    .map(res => {
      return res;
    })
  }

}
