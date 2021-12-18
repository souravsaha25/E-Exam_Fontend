import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-ConfrimEmail',
  templateUrl: './ConfrimEmail.component.html',
  styleUrls: ['./ConfrimEmail.component.css']
})
export class ConfrimEmailComponent implements OnInit {

  data : any;
  error = true;
  token: string = "";
  errorMgs: string = "";
  successMgs: string = "";
  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token); // Print the parameter to the console.
    });
  }

  ngOnInit() {
    this.authService.activeUser(this.token).subscribe(
      (response) => {
        this.data = response;
        if (this.data) {
          this.error = false;
        }
        else {
          this.error = true;
        }
      },
      (error) => {
        this.error = false;
        this.errorMgs = error.error;
      });
  }

}
