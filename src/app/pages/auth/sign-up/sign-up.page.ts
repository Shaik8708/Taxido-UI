import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { Base } from 'src/app/services/base-api/base';
import urlConfig from '../../../config/url.config.json';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean | undefined;
  showConfirmPassword: boolean | undefined;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private baseApi: Base,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        userName: ['', [Validators.required, Validators.minLength(2)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        // referralId: [''],
      },
      {
        validators: [this.passwordMatchValidator], // ✅ add custom validator
      }
    );
  }

  ngOnInit() {}

  // Custom validator for matching passwords
  passwordMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    // if (this.signupForm.valid) {
    //   let data = this.signupForm.value;
    //   const register = {
    //     type: ['dealer'],
    //     fullName: data.fullName,
    //     password: data.password,
    //     email: data.email,
    //     username: data.userName,
    //     phoneNumber: data.phoneNumber,
    //   };

    //   this.baseService.signup(register).subscribe({
    //     next: (res) => {
    //       console.log(res);

    //       // this.baseService.saveToken(res.token);
    //       this.signupForm.reset();
    // this.router.navigate(['/login']); // redirect to dashboard
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.error?.message || 'Login failed';
    //     },
    //   });
    // } else {
    //   this.signupForm.markAllAsTouched();
    // }

    let data = this.signupForm.value;
    console.log(data);

    data.accessLevel = ['driver'];
    // const payload = {
    //   "type": "dealer",
    //   "firstName": "dealers3",
    //   "lastName": "ones4",
    //   "username": "dealers3",
    //   "password": "dealers3",
    //   "email": "abc1235@gmail.com",
    //   "phoneNumber": "49882383474",
    //   "accessLevel": [
    //       "dealer"
    //   ]
    // }
    // this.loader.start()
    // this.api.submitRegister(data)
    this.baseApi
      .post(urlConfig.dealerRegisterPath, data)
      .pipe(
        finalize(() => {
          // this.loader.end();
        }),
        catchError((err) => {
          if (err?.error?.message == 'Error From Fast To Sms') {
            // this.toastService.presentToast("Spamming detected", "danger");
          } else {
            // this.toastService.presentToast(err?.error?.message, "danger");
          }
          throw err;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == 'success') {
          // this.toastService.presentToast("OTP Sent succesfully ", "success");
          // this.api.submitotp({"email":res?.data?.email,"emailOTP":String(res?.data?.emailOTP)})

          this.cookieService.set('driver_phone', data?.phoneNumber);
          this.router.navigateByUrl('/otp');
        }
      });
  }
}
