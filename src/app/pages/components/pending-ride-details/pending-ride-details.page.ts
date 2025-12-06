import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from 'src/app/services/base-api/base';
import config from 'src/app/config/url.config.json';
import { Loader } from 'src/app/services/loader';
import { AlertController } from '@ionic/angular';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-pending-ride-details',
  templateUrl: './pending-ride-details.page.html',
  styleUrls: ['./pending-ride-details.page.scss'],
  standalone: false,
})
export class PendingRideDetailsPage implements OnInit {
  ride: any = null;
  isLoading = true;
  errorMessage = '';
  urlConfig = config;

  constructor(
    private route: ActivatedRoute,
    private baseApi: Base,
    private loader: Loader,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const rideId = params['id'];
      if (rideId) {
        this.fetchRideDetails(rideId);
      } else {
        this.isLoading = false;
        this.errorMessage = 'No ride ID provided';
      }
    });
  }

  fetchRideDetails(rideId: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.baseApi
      .get(`${this.urlConfig.driverHistoryPath}?id=${rideId}`)
      .subscribe(
        (response: any) => {
          if (response?.status === 'success' && response?.data) {
            // If the API returns a docs array, get the first item; otherwise use data directly
            this.ride = Array.isArray(response.data.docs)
              ? response.data.docs[0]
              : response.data;
            if (!this.ride) {
              this.errorMessage = 'Ride not found';
            }
          } else {
            this.errorMessage = 'Failed to fetch ride details';
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching ride details:', error);
          this.errorMessage = 'Error fetching ride details. Please try again.';
          this.isLoading = false;
        }
      );
  }

  async startRide() {
    if (!this.ride?._id) {
      this.errorMessage = 'No ride selected';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    await this.loader.showLoading('Starting ride...');

    this.baseApi
      .patch(`${this.urlConfig.driverLeadStartedPath}/${this.ride._id}`, {})
      .pipe(
        catchError((error) => {
          console.error('Error starting ride:', error);
          this.errorMessage = error?.error?.message || 'Failed to start ride';
          return [];
        }),
        finalize(async () => {
          this.isLoading = false;
          await this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          // API may return updated ride in data.docs or data
          if (res?.data) {
            this.router.navigate(['/active-rides']);
            this.ride = Array.isArray(res.data.docs)
              ? res.data.docs[0]
              : res.data;
          }
        } else {
          this.errorMessage = res?.message || 'Failed to start ride';
        }
      });
  }

  async cancelRide(reason: string = '') {
    if (!this.ride?._id) {
      this.errorMessage = 'No ride selected';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    await this.loader.showLoading('Cancelling ride...');

    const payload = reason ? { reason } : {};

    this.baseApi
      .patch(
        `${this.urlConfig.driverLeadCancelledPath}/${this.ride._id}`,
        payload
      )
      .pipe(
        catchError((error) => {
          console.error('Error cancelling ride:', error);
          this.errorMessage = error?.error?.message || 'Failed to cancel ride';
          return [];
        }),
        finalize(async () => {
          this.isLoading = false;
          await this.loader.dismissLoading();
        })
      )
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          if (res?.data) {
            this.ride = Array.isArray(res.data.docs)
              ? res.data.docs[0]
              : res.data;
            // After successful cancellation navigate to active rides
            this.router.navigate(['/active-rides']);
          }
        } else {
          this.errorMessage = res?.message || 'Failed to cancel ride';
        }
      });
  }

  async openCancelModal() {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Ride',
      inputs: [
        {
          name: 'reason',
          type: 'textarea',
          placeholder: 'Enter reason for cancellation',
        },
      ],
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
        },
        {
          text: 'Submit',
          handler: (data) => {
            const reason = data?.reason?.trim() || '';
            this.cancelRide(reason);
          },
        },
      ],
    });

    await alert.present();
  }
}
