import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRidesPage } from './active-rides.page';

describe('ActiveRidesPage', () => {
  let component: ActiveRidesPage;
  let fixture: ComponentFixture<ActiveRidesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
