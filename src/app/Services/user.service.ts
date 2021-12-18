import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserModule } from '../Model/UserModule';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = environment.baseUrl;
  constructor(private http: HttpClient) { }

  addUser(data: UserModule) {
    const token = sessionStorage.getItem('token');
    const reqHeader = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseURL + '/User/CreateUser', data, { headers: reqHeader });
  }

  registerUser(data: UserModule) {
    return this.http.post(this.baseURL + '/User/Register', data);
  }

  allUsers(){
    const token=sessionStorage.getItem('token')
    const reqHeader=new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(this.baseURL + '/User/GetAllUsers', { headers: reqHeader })
  }
}
