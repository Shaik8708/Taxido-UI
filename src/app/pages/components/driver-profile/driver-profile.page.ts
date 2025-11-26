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
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.page.html',
  styleUrls: ['./driver-profile.page.scss'],
  standalone: false,
})
export class DriverProfilePage implements OnInit {
  driverProfileForm: FormGroup;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private baseApi: Base,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.driverProfileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      city: [''],
      state: [''],
      gender: [''],

      // required vehicle & identity fields
      vehicleType: ['', [Validators.required]],
      vehicleName: ['', [Validators.required, Validators.minLength(2)]],
      vehicleNumber: ['', [Validators.required]],
      vehicleRc: ['', [Validators.required]],
      driverDL: ['', [Validators.required]],

      // Aadhar: 12 digits
      aadharNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{12}$/)],
      ],

      // profilePicture will hold base64 string; validated on file select
      profilePicture: [
        '',
        [Validators.required, this.base64SizeValidator(2 * 1024 * 1024)],
      ],
    });
  }

  ngOnInit() {}

  // Custom validator for matching passwords
  passwordMatchValidator(
    formGroup: AbstractControl
  ): { [key: string]: boolean } | null {
    // kept for backward compatibility but not used by new form
    return null;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    // not used in driver profile form
  }

  // Validator to ensure base64 payload size is under maxBytes
  base64SizeValidator(maxBytes: number) {
    return (control: AbstractControl) => {
      const val = control.value as string;
      if (!val) return null;
      try {
        // strip data url prefix if present
        const idx = val.indexOf('base64,');
        const b64 = idx >= 0 ? val.substring(idx + 7) : val;
        // approximate byte size
        const padding = (b64.match(/=+$/) || [''])[0].length;
        const inBytes = (b64.length * 3) / 4 - padding;
        if (inBytes > maxBytes) {
          return { maxSize: true };
        }
        return null;
      } catch (e) {
        return { invalidBase64: true };
      }
    };
  }

  // Call this from template file input change event. It reads file and stores base64 string.
  async onProfilePictureSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files && input.files[0];
    if (!file) return;

    // size check (raw file size)
    const maxBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxBytes) {
      this.driverProfileForm
        .get('profilePicture')
        ?.setErrors({ maxSize: true });
      return;
    }

    const base64 = await this.readFileAsBase64(file);
    this.driverProfileForm.get('profilePicture')?.setValue(base64);
    // re-run validator
    this.driverProfileForm.get('profilePicture')?.updateValueAndValidity();
  }

  // keyboard helper to open hidden file input when label is focused and Enter is pressed
  openProfilePicPicker() {
    const el = document.getElementById(
      'profilePicInput'
    ) as HTMLInputElement | null;
    if (el) {
      el.click();
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    let data = this.driverProfileForm.value;
    console.log(data);

    // data.accessLevel = ['driver'];
    if (this.driverProfileForm.valid) {
      this.baseApi
        .post(urlConfig.driverCreateAccountPath, data)
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

            // this.cookieService.set('driver_phone', data?.phoneNumber);
            this.router.navigateByUrl('/dashboard');
          }
        });
    }
  }
}
