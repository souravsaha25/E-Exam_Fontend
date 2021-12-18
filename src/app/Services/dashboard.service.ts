import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ExamsModel } from '../Model/ExamModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getDashboard_Radial(data: ExamsModel) {
    const token = sessionStorage.getItem('token')
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/Dashboard/DashboardRadial', data, { headers: reqHeader });
  }
}
