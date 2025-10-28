import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from 'src/app/services/base-api/base';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private baseService: Base,
    private router: Router
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
    this.router.navigate(['/dashboard']);
    //       } else {
    //         this.errorMessage = 'Invalid response from server';
    //       }
    //     },
    //     error: (err) => {
    //       this.errorMessage = err.error?.message || 'Login failed. Try again.';
    //     },
    //   });
    // }
  }
}
