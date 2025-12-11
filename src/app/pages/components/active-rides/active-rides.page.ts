import { Component, OnInit } from '@angular/core';
import { Base } from 'src/app/services/base-api/base';
import { Loader } from 'src/app/services/loader';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  individualRideInfo;
  cancelRideForm: FormGroup;

  constructor(private loader: Loader, private baseApi: Base, private fb: FormBuilder) {
    this.cancelRideForm = this.fb.group({
      reason: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    console.log('old');
  }

  ionViewWillEnter() {
    this.getStartedRides();
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
          console.log('loading final');
          
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

  completeRide(rideId: string) {
    if (!rideId) return;

    this.loader.showLoading('Completing ride...');
    this.baseApi.patch(`${urlConfig.driverLeadCompletedPath}/${rideId}`, {})
      .pipe(
        catchError((error) => {
          console.error('Error completing ride:', error);
          this.hasError = true;
          this.errorMessage = error?.error?.message || 'Failed to complete ride';
          return [];
        }),
        finalize(async () => {
          await this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          this.getStartedRides();
        }
      });
  }

  setRideId(ride){
    this.individualRideInfo = ride;
    console.log('Cancel ride');

  }

  cancelRide() {
    const reasonControl = this.cancelRideForm.get('reason');
    if (!this.individualRideInfo?._id && !this.individualRideInfo?.id) return;
    const rideId = this.individualRideInfo._id || this.individualRideInfo.id;

    if (!reasonControl) return;
    if (this.cancelRideForm.invalid) {
      reasonControl.markAsTouched();
      return;
    }

    const reason = reasonControl.value;

    this.loader.showLoading('Cancelling ride...');
    this.baseApi
      .patch(`${urlConfig.driverLeadCancelledPath}/${rideId}`, { reason })
      .pipe(
        catchError((error) => {
          console.error('Error cancelling ride:', error);
          this.hasError = true;
          this.errorMessage = error?.error?.message || 'Failed to cancel ride';
          return [];
        }),
        finalize(async () => {
          await this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          this.cancelRideForm.reset();
          this.individualRideInfo = null;
          this.getStartedRides();
        }
      });
  }
}
