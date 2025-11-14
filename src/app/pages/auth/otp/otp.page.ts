import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, finalize } from 'rxjs';
import { Base } from 'src/app/services/base-api/base';
import urlConfig from '../../../config/url.config.json';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
  standalone: false,
})
export class OtpPage implements OnInit {
  otp: any;
  isEnabled: boolean = false;

  timeLimit = 60;

  otpControls = [1, 2, 3, 4, 5];
  countDownTimer;
  enableResendOtp: boolean = false;
  phoneNumber = '';
  config = {
    allowNumbersOnly: true,
    length: 5,
    inputStyles: {
      width: '46px',
      height: '46px',
      'border-radius': '8px',
    },
  };
  // private obService: ObservableService,private toastService: ToastService, private inputFocusService: AutoFocusService,
  constructor(
    private baseApi: Base,
    private router: Router,
    private cookieService: CookieService
  ) {}

  moveToNext(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value.length === 1 && index < this.otpControls.length - 1) {
      const next = document.getElementById('five' + (index + 2));
      next?.focus();
    }
  }

  moveBack(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value === '' && index > 0) {
      const prev = document.getElementById('five' + index);
      prev?.focus();
    }
  }

  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: ElementRef;

  ngAfterViewInit() {
    // this.inputFocusService.focusInputField(this.ngOtpInput);
  }
  ngOnInit() {
    // this.headerFooterService.setShowHeaderFooter(false);
    // this.loadinService.end();

    this.startCountdown();
    // let ph  = this.obService.getData();
    // this.phoneNumber = ph?.phoneNumber;
    // console.log('Stored Data:', this.phoneNumber);
    this.phoneNumber = this.cookieService?.get('driver_phone');

    // if (!this.phoneNumber) {
    //   this.router.navigateByUrl('/login');
    // }
  }

  async onSubmit() {
    // this.loadinService.start();
    let data = {
      phoneNumber: this.cookieService.get('driver_phone'),
      phoneOTP: this.getOtpFromUI(),
    };

    this.baseApi
      .post(urlConfig.dealerLoginPath, data)
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
        if (res?.status == 'success') {
          this.cookieService.set('driver_actkn', res?.data?.accessToken);
          this.cookieService.set('driver_rftkn', res?.data?.refresulthToken);
          this.router.navigateByUrl('/dashboard');
          // this.getDealerDetailsByPhoneNumber(this.phoneNumber, res);
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
  }

  startCountdown() {
    this.countDownTimer = this.timeLimit;
    let counter = 0;
    const interval = setInterval(() => {
      this.countDownTimer--;
      counter++;
      if (counter == this.timeLimit) {
        clearInterval(interval);
        this.countDownTimer = null;
        this.enableResendOtp = true;
      }
    }, 1000);
  }

  getOtpFromUI() {
    let otp = '';
    for (let i = 1; i <= 5; i++) {
      const val =
        (document.getElementById('five' + i) as HTMLInputElement)?.value || '';
      otp += val;
    }
    return otp;
  }

  async getOtp() {
    let data = {
      phoneNumber: this.phoneNumber,
    };

    // this.loadinService.start();

    this.enableResendOtp = false;

    // this.toast.showToast(response.message, "success");
    this.startCountdown();

    this.baseApi
      .post(urlConfig.otpSentDealerPath, data)
      .pipe(
        finalize(() => {
          // this.loadinService.end();
        }),
        catchError((err) => {
          if (err?.error?.message == 'Error From Fast To Sms') {
            // this.toastService.presentToast("Spamming detected", "danger");
          } else if (err?.error?.message == 'Required Parameters!') {
            // this.toastr.error("Required Parameters!");
            // this.toastService.presentToast("Required Parameters!", "warning");
          } else {
            // this.toastService.presentToast(err?.error?.message, "danger");
          }
          throw err;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == 'success') {
          //  this.obService.setData({ phoneNumber: this.phoneNumber });
          // this.toastService.presentToast("OTP Sent", "success");
          // this.toastr.success("Successfully Registered");
          // this.toastr.success("OTP Sent");
          //  this.route.navigateByUrl('/home')
        } else if (res?.message == 'Required Parameters!') {
          // this.toastr.error("Required Parameters!");
          // this.toastService.presentToast("Required Parameters!", "warning");
        }
      });
  }

  getDealerDetailsByPhoneNumber(phoneNumber: any, result: any) {
    this.baseApi
      .get(
        `${urlConfig.getAllPath}?collectionName=${urlConfig.dealerDetails}&phoneNumber=${phoneNumber}`
      )
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          // this.toastService.presentToast(err?.error?.message, "danger");
          return [];
        })
      )
      .subscribe((detailsRes: any) => {
        if (detailsRes?.data?.docs?.length == 0) {
          if (result?.data?.accountType == 'dealer') {
            this.createDealerDetails(result);
          } else {
            this.cookieService.deleteAll();
            // this.toastService.presentToast("You are not registered partner, Please login with partner credentials.", "danger");
          }
        } else if (detailsRes?.data?.docs?.length > 0) {
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 7); // Set expiration to 2 hours from now
          if (
            detailsRes?.data?.docs?.length > 0 &&
            detailsRes?.data?.docs[0]?.status == 'true' &&
            result?.data?.accountType == 'dealer'
          ) {
            // this.toastService.presentToast("Login Successfull", "success");
            this.setCookies(result, detailsRes?.data?.docs[0]);
            this.router.navigateByUrl('/leads');
          }
          // else if (detailsRes?.data?.docs[0]?.initialVerification == "false") {
          //   this.cookieService.deleteAll();
          //   this.toastService.presentToast("Your account is not verified, contact support to verify.", "danger");
          // }
          else if (detailsRes?.data?.docs[0]?.status == 'false') {
            this.cookieService.deleteAll();
            // this.toastService.presentToast("Your account is blocked, contact support to unblock.", "danger");
          } else {
            this.cookieService.deleteAll();
            // this.toastService.presentToast("Something went wront, contact support team.", "danger");
            // alert("Your account is not verified, contact support to verify.");
          }
        }
      });
  }

  createDealerDetails(dealerLoginData: any) {
    let payload = {
      collectionName: urlConfig.dealerDetails,
      phoneNumber: this.phoneNumber,
      email: dealerLoginData?.data?.email,
      dealerId: dealerLoginData?.data?._id,
      username: dealerLoginData?.data?.username,
      fullName: dealerLoginData?.data?.fullName,
      isResgistered: 'true',
      status: 'true',
      initialVerification: 'false',
      bussinessDocumentVerification: 'false',
    };

    this.baseApi
      .post(`${urlConfig.createPath}`, payload)
      .pipe(
        finalize(() => {}),
        catchError((err) => {
          // this.toastService.presentToast(err?.error?.message, "danger");

          return [];
        })
      )
      .subscribe((detailsRes: any) => {
        if (detailsRes?.status == 'success') {
          // this.cookieService.deleteAll();
          this.setCookies(dealerLoginData, detailsRes?.data);

          // this.toastService.presentToast("Login Successfull", "success");
          this.router.navigateByUrl('/leads');
        } else if (dealerLoginData?.data?.accountType != 'dealer') {
          this.cookieService.deleteAll();
          // this.toastService.presentToast("You are not registered partner, Please login with partner credentials.", "danger");
        } else {
          this.cookieService.deleteAll();
          // this.toastService.presentToast("Something went wront, contact support team.", "danger");
          // alert("Your account is not verified, contact support to verify.");
        }
      });
  }

  setCookies(result: any, detailsRes: any) {
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 7); // Set expiration to 2 hours from now

    this.cookieService.set('driver_phone', this.phoneNumber, expirationDate);
    this.cookieService.set(
      'driver_actkn',
      result?.data?.accessToken,
      expirationDate
    );
    this.cookieService.set(
      'driver_rftkn',
      result?.data?.refresulthToken,
      expirationDate
    );
    this.cookieService.set(
      'driver_fullName',
      result?.data?.fullName,
      expirationDate
    );
    this.cookieService.set(
      'driver_userName',
      result?.data?.username,
      expirationDate
    );
    this.cookieService.set('driver_email', result?.data?.email, expirationDate);
    this.cookieService.set('driver_id', result?.data?._id, expirationDate);

    this.cookieService.set(
      'asp_d_dbials',
      detailsRes?.shopRegisteredName,
      expirationDate
    );
    this.cookieService.set(
      'asp_d_dbialsfn',
      detailsRes?.fullName,
      expirationDate
    );
    this.cookieService.set('asp_dp_cn', detailsRes?.city, expirationDate);
    this.cookieService.set('asp_dp_ci', detailsRes?.cityId, expirationDate);
    this.cookieService.set(
      'asp_d_dbialsa',
      detailsRes?.shopAddress,
      expirationDate
    );
    this.cookieService.set('asp_d_dts1d', detailsRes?._id, expirationDate);

    // Automatically remove the cookie after 2 hours
    setTimeout(() => {
      this.removeCookie();
    }, 7 * 60 * 60 * 1000); // 2 hours in milliseconds
  }
}
