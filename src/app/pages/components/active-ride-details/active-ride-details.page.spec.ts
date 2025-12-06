import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRideDetailsPage } from './active-ride-details.page';

describe('ActiveRideDetailsPage', () => {
  let component: ActiveRideDetailsPage;
  let fixture: ComponentFixture<ActiveRideDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRideDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
