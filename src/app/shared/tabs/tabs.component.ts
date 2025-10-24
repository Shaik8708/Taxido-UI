import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: false,
})
export class TabsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  // Navigation items
  navItems = [
    {
      label: 'Home',
      route: '/dashboard',
      icon: 'assets/images/svg/home.svg',
      activeIcon: 'assets/images/svg/home-fill.svg',
    },
    {
      label: 'Active Ride',
      route: '/active-rides',
      icon: 'assets/images/svg/driving.svg',
      activeIcon: 'assets/images/svg/driving-fill.svg',
    },
    {
      label: 'My Rides',
      route: '/my-rides',
      icon: 'assets/images/svg/car.svg',
      activeIcon: 'assets/images/svg/car-fill.svg',
    },
    {
      label: 'Setting',
      route: '/settings',
      icon: 'assets/images/svg/setting.svg',
      activeIcon: 'assets/images/svg/setting-fill.svg',
    },
  ];

  // Check if current route matches
  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
