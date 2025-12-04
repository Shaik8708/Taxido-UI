import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PendingRideDetailsPage } from './pending-ride-details.page';

describe('PendingRideDetailsPage', () => {
  let component: PendingRideDetailsPage;
  let fixture: ComponentFixture<PendingRideDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingRideDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
