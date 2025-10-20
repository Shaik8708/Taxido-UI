import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from 'src/app/services/base-api/base';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: false,
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean | undefined;
  showConfirmPassword: boolean | undefined;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private baseService: Base,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(2)]],
        userName: ['', [Validators.required, Validators.minLength(2)]],
        number: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
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
    if (this.signupForm.valid) {
      let data = this.signupForm.value;
      const register = {
        type: ['dealer'],
        fullName: data.fullName,
        password: data.password,
        email: data.email,
        username: data.userName,
        phoneNumber: data.number,
      };

      this.baseService.signup(register).subscribe({
        next: (res) => {
          console.log(res);

          // this.baseService.saveToken(res.token);
          this.signupForm.reset();
          this.router.navigate(['/home']); // redirect to dashboard
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Login failed';
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
