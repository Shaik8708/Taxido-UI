import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare var bootstrap: any; // 👈 only if you're using Bootstrap offcanvas

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent implements OnInit {
  isOpen = false; // use this if your sidebar toggles via *ngIf or CSS

  constructor(private router: Router) {}

  ngOnInit() {
    // Close sidebar whenever route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // CASE 1: Bootstrap offcanvas sidebar
        const offcanvasEl = document.querySelector('.offcanvas.show');
        if (offcanvasEl) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
          bsOffcanvas?.hide();
        }

        // CASE 2: Custom toggle-based sidebar
        this.isOpen = false;
      }
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  closeSidebar() {
    this.isOpen = false;
  }
}
