import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverProfilePage } from './driver-profile.page';

describe('DriverProfilePage', () => {
  let component: DriverProfilePage;
  let fixture: ComponentFixture<DriverProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
