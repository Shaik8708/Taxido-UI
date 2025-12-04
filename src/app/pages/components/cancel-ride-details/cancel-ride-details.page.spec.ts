import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelRideDetailsPage } from './cancel-ride-details.page';

describe('CancelRideDetailsPage', () => {
  let component: CancelRideDetailsPage;
  let fixture: ComponentFixture<CancelRideDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelRideDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
