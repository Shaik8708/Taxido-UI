import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteRideDetailsPage } from './complete-ride-details.page';

describe('CompleteRideDetailsPage', () => {
  let component: CompleteRideDetailsPage;
  let fixture: ComponentFixture<CompleteRideDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteRideDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
