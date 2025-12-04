import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from 'src/app/services/base-api/base';
import { Loader } from 'src/app/services/loader';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-my-rides',
  templateUrl: './my-rides.page.html',
  styleUrls: ['./my-rides.page.scss'],
  standalone: false,
})
export class MyRidesPage implements OnInit {
  isLoading = false;
  hasError = false;
  errorMessage = '';
  filteredRides: any[] = [];

  constructor(
    private loader: Loader,
    private baseApi: Base,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFilteredRides('accepted');
  }

  async getFilteredRides(type: string) {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    await this.loader.showLoading('Fetching Profile...');

    this.baseApi
      .get(`${urlConfig.driverHistoryPath}?type=${type}`)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);

          this.hasError = true;
          this.errorMessage =
            error?.error?.message || 'Something broke on the server';

          return []; // ✅ prevents subscription crash
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
            this.filteredRides = res?.data?.docs;
            console.log(this.filteredRides);
          }
        }
      });
  }
}
