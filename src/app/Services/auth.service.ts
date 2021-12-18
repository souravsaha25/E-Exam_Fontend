import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../Model/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.baseUrl;
  constructor(private http: HttpClient) { }

  authUser(user: Login) {
    return this.http.post(this.baseURL + '/Auth/Authenticate', user);
  }

  activeUser(token: string) {
    return this.http.post(this.baseURL + '/Auth/ActiveAccount?token=' + token, null);
  }
}
