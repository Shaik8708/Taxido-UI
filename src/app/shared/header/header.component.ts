import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  type: 'app' | 'auth' = 'app'; // only 2 base layouts
  title = '';
  showMenu = false;
  showBack = false;
  showLogo = false;
  showNotification = false;
  showMessages = false;

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = e.urlAfterRedirects;
        this.configureHeader(url);
      });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  private configureHeader(url: string) {
    // Reset all
    this.type = 'app';
    this.title = '';
    this.showMenu = false;
    this.showBack = false;
    this.showLogo = false;
    this.showNotification = false;
    this.showMessages = false;

    // Pages that require back button
    const backButtonPages = [
      { path: '/notification', title: 'Notifications' },
      { path: '/pending-ride-details', title: ' Details' },
      { path: '/complete-ride-details', title: ' Details' },
      { path: '/cancel-ride-details', title: ' Details' },
      { path: '/active-ride-details', title: ' Details' },
      { path: '/driver-wallet', title: 'My Wallet' },
      { path: '/otp', title: 'OTP' },
    ];

    // Check if current page needs back button
    const backPageConfig = backButtonPages.find((page) =>
      url.includes(page.path)
    );
    if (backPageConfig) {
      this.showBack = true;
      this.title = backPageConfig.title;
      if (
        url.includes('/login') ||
        url.includes('/signup') ||
        url.includes('/otp')
      ) {
        this.type = 'auth';
        this.showLogo = true;
      }
      return;
    }

    if (url.includes('/dashboard')) {
      this.showMenu = true;
      this.showLogo = true;
      this.showNotification = true;
    } else if (url.includes('/my-ride')) {
      this.showMenu = true;
      this.showMessages = true;
      this.showNotification = true;
      this.title = 'My Ride';
    } else if (url.includes('/setting')) {
      this.showMenu = true;
      this.title = 'Settings';
    } else if (url.includes('/active-ride')) {
      this.showMenu = true;
      this.title = 'Active Ride';
    } else if (url.includes('/login') || url.includes('/signup')) {
      this.type = 'auth';
      this.showLogo = true;
    } else {
      this.showLogo = true;
    }
  }
}
