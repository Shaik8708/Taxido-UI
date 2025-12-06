import { Component, OnInit } from '@angular/core';
import { Base } from 'src/app/services/base-api/base';
import { Loader } from 'src/app/services/loader';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-active-rides',
  templateUrl: './active-rides.page.html',
  styleUrls: ['./active-rides.page.scss'],
  standalone: false,
})
export class ActiveRidesPage implements OnInit {
  isLoading = false;
  hasError = false;
  errorMessage = '';
  rides: any[] = [];

  constructor(private loader: Loader, private baseApi: Base) {}

  ngOnInit() {
    console.log('olf');
    this.getStartedRides();
  }

  ionViewWillEnter() {
    // Refresh rides data every time the page is navigated to (for non-initial loads)
    if (this.rides.length > 0 || this.isLoading) {
      this.getStartedRides();
    }
  }

  async getStartedRides() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    await this.loader.showLoading('Fetching active rides...');

    this.baseApi
      .get(`${urlConfig.driverHistoryPath}?type=started`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching started rides:', error);
          this.hasError = true;
          this.errorMessage = error?.error?.message || 'Something went wrong';
          return [];
        }),
        finalize(async () => {
          this.isLoading = false;
          await this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          this.hasError = false;
          if (res?.data?.total > 0) {
            this.rides = res.data.docs;
          } else {
            this.rides = [];
          }
        }
      });
  }

  cancelRide(ride) {
    console.log('Cancel ride', ride._id);
  }
}
