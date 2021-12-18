import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { UserService } from '../../../Services/user.service';
import { UserModule } from '../../../Model/UserModule';

@Component({
  selector: 'app-AddUser-component',
  templateUrl: './AddUser-component.component.html',
  styleUrls: ['./AddUser-component.component.css']
})
export class AddUserComponentComponent implements OnInit {
  validateForm: FormGroup = new FormGroup({});
  loading = false;
  avatarUrl?: string;

  selectedGender:string="";
  selectedRole:string="";
  user!: UserModule;
  data!: any;

  genderChange(value: string): void {
    this.selectedGender = value;
  }

  roleChange(value: string): void {
    this.selectedRole = value;
  }

  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private msg: NzMessageService,
    private userService: UserService) { }


  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      address: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+91'],
      phoneNumber: [null, [Validators.required]],
      DOB: [null],
      DOJ: [null],
      gender: [null, [Validators.required]],
      role: [null, [Validators.required]]
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  //Get Add user data
  AdduserData(): UserModule {
    return this.user = {
      UName: this.name.value,
      UEmail: this.email.value,
      UAddress: this.address.value,
      Password: this.password.value,
      ConfirmPassword: this.checkPassword.value,
      UPhone: this.phoneNumber.value,
      DOB: this.DOB.value,
      Gender: this.selectedGender,
      Role: this.selectedRole,
      DateofJoining: this.DOJ.value
    }
  }
  get name() {
    return this.validateForm.get('name') as FormControl;
  }
  get email() {
    return this.validateForm.get('email') as FormControl;
  }
  get address() {
    return this.validateForm.get('address') as FormControl;
  }
  get password() {
    return this.validateForm.get('password') as FormControl;
  }
  get checkPassword() {
    return this.validateForm.get('checkPassword') as FormControl;
  }
  get phoneNumber() {
    return this.validateForm.get('phoneNumber') as FormControl;
  }
  get DOB() {
    return this.validateForm.get('DOB') as FormControl;
  }

  get DOJ() {
    return this.validateForm.get('DOJ') as FormControl;
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (this.validateForm.valid) {
      this.userService.addUser(this.AdduserData()).subscribe(
        (response)=>{
          this.data=response;
          console.log(response);

        },
        (error)=>{
          console.log(error);
        });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  //Validation for Password and confrim password
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  //Image upload
  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]) =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }
}
