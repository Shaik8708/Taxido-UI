import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from 'src/app/services/base-api/base';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private baseApi: Base,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    // if (this.loginForm.valid) {
    //   this.baseService.login(this.loginForm.value).subscribe({
    //     next: (res) => {
    //       if (res?.token) {
    //         this.baseService.saveToken(res.token);
    // this.router.navigate(['/dashboard']);
    //       } else {
    //         this.errorMessage = 'Invalid response from server';
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.error?.message || 'Login failed. Try again.';
    //     },
    //   });
    // }
    let data = this.loginForm.value;
    // this.loader.showLoading("Logging In")
    this.baseApi
      .post(`${urlConfig.dealerLoginPath}`, data)
      .pipe(
        catchError((error) => {
          alert(error?.error?.message);
          throw error;
        }),
        finalize(() => {
          // this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        // localStorage.setItem('username', res?.data?.username);
        // localStorage.setItem('userId', res?.data?._id);
        // localStorage.setItem('useremail', res?.data?.email);
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 7); // Set expiration to 2 hours from now
        if (res?.status == 'success') {
          this.cookieService.set(
            'driver_phone',
            data?.phoneNumber,
            expirationDate
          );
          this.cookieService.set(
            'driver_actkn',
            res?.data?.accessToken,
            expirationDate
          );
          this.cookieService.set(
            'driver_rftkn',
            res?.data?.refreshToken,
            expirationDate
          );
          this.cookieService.set(
            'driver_fullName',
            res?.data?.fullName,
            expirationDate
          );
          this.cookieService.set(
            'driver_userName',
            res?.data?.username,
            expirationDate
          );
          this.cookieService.set(
            'driver_email',
            res?.data?.email,
            expirationDate
          );
          this.cookieService.set('driver_id', res?.data?._id, expirationDate);
          this.cookieService.set(
            'driver_cityId',
            res?.data?.cityId,
            expirationDate
          );
          this.cookieService.set(
            'driver_cityName',
            res?.data?.cityName,
            expirationDate
          );
          // this.cookieService.set(
          //   'd_dbials',
          //   res?.data?.businessDetails,
          //   expirationDate
          // );
          // $('#successfullyModal').modal('show');
          this.router.navigate(['/dashboard']);
        } else if (res.message == 'Your not a existing.Verify OTP!') {
          // $('#notExistingUser').modal('show');
        }
      });
  }

  removeCookie() {
    this.cookieService.delete('driver_phone');
    this.cookieService.delete('driver_actkn');
    this.cookieService.delete('driver_rftkn');
    this.cookieService.delete('driver_fullName');
    this.cookieService.delete('driver_userName');
    this.cookieService.delete('driver_email');
    this.cookieService.delete('driver_id');
    this.cookieService.delete('driver_cityId');
    this.cookieService.delete('driver_cityName');
    // this.cookieService.delete('d_dbials');
  }

  login() {
    // Enabling Side Menu
    // this.util.setMenuState(true);
    // this.navCtrl.navigateRoot('/home', { animationDirection: 'forward' });
  }

  hideShowPass() {
    this.showPassword = !this.showPassword;
  }

  async getOtp() {
    let data = {
      phoneNumber: this.loginForm.value.phoneNumber,
    };
    if (this.loginForm.value.phoneNumber) {
      // this.loadinService.start()
      // this.api.otpRegister(data)
      this.baseApi
        .post(urlConfig.otpSentDealerPath, data)
        .pipe(
          finalize(() => {
            // this.loadinService.end();
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
          console.log(res);
          if (res?.status == 'success') {
            // this.doLogin(data);

            this.cookieService.set('driver_phone', res?.data?.phoneNumber);
            // this.toastService.presentToast("Successfully OTP Sent", "success");
            this.router.navigateByUrl('/otp');
          }
        });
    } else {
      // this.toastService.presentToast("Enter Phone number.", "danger");
    }
  }
}
