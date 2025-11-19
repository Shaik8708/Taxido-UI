import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOtpPage } from './login-otp.page';

describe('LoginOtpPage', () => {
  let component: LoginOtpPage;
  let fixture: ComponentFixture<LoginOtpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
