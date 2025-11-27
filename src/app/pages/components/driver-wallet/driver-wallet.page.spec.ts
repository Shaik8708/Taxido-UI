import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverWalletPage } from './driver-wallet.page';

describe('DriverWalletPage', () => {
  let component: DriverWalletPage;
  let fixture: ComponentFixture<DriverWalletPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
