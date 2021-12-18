import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Model/Login';
import { AuthService } from 'src/app/Services/auth.service';
import { UserModule } from '../../../Model/UserModule';
import { CookieService } from 'ngx-cookie-service';
import { Request } from 'express';

@Component({
  selector: 'app-Login-component',
  templateUrl: './Login-component.component.html',
  styleUrls: ['./Login-component.component.css']
})

export class LoginComponentComponent implements OnInit {

  error: boolean = false;
  validateForm!: FormGroup;
  login: Login = {} as Login;
  user!: any;
  rem: string = "";
  CookieExpiryDay: number = 30;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _cookieService: CookieService) {
    if (_cookieService.get('remember') !== undefined) {
      if (_cookieService.get('remember')) {
        this.login = {} as Login;
        this.login.UserName = this._cookieService.get('username');
        this.login.Password = this._cookieService.get('password');
        this.loginApp(this.login);
      }
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  get username() {
    return this.validateForm.get('userName') as FormControl;
  }
  get password() {
    return this.validateForm.get('password') as FormControl;
  }

  //Submit Login data
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.rem = this.validateForm.controls['remember'].value;
      this.login = {} as Login;
      this.login.UserName = this.validateForm.controls['userName'].value;
      this.login.Password = this.validateForm.controls['password'].value;
      if (this.rem) {
        this._cookieService.set('remember', this.rem, this.CookieExpiryDay);
        this._cookieService.set('username', this.login.UserName, this.CookieExpiryDay);
        this._cookieService.set('password', this.login.Password, this.CookieExpiryDay);
      }
      this.loginApp(this.login);
    }
  }

  loginApp(userData: Login) {
    this.authService.authUser(userData).subscribe(
      (response) => {
        this.user = response;
        if (this.user) {
          sessionStorage.setItem('userRole', this.user.role);
          sessionStorage.setItem('userID', this.user.uid);
          sessionStorage.setItem('token', this.user.token);
          sessionStorage.setItem('name', this.user.uName);
          this.router.navigate(['/Dashboard']);
        }
        else {
          this.error = true;
        }
      },
      (error) => {
        // get the status as error.status
        if (error.status != 200) {
          this.error = true;
        };
      });
  }
}
