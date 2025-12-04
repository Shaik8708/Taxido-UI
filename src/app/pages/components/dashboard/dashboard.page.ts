import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Loader } from 'src/app/services/loader';
import urlConfig from '../../../config/url.config.json';
import { Base } from 'src/app/services/base-api/base';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  isLoading = false;
  hasError = false;
  errorMessage = '';
  upcomingRides: any[] = [];

  constructor(
    private loader: Loader,
    private baseApi: Base,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllLeads();
  }

  // async getAllLeads() {
  //   // this.username = this.cookieService?.get('asp_dh_14');
  //   // this.dealerId = this.cookieService?.get('asp_dp_iy');
  //   // this.phoneNumber = this.cookieService?.get('asp_dphn');
  //   // this.email = this.cookieService?.get('asp_de_9i')
  //   // this.fullName = this.cookieService?.get('asp_dh_12')
  //   await this.loader.showLoading('Fetching Profile...');

  //   // this.api.getUserProfile(userId)
  //   this.baseApi
  //     .get(`${urlConfig.driverLeadsPath}`)
  //     .pipe(
  //       catchError((error) => {
  //         console.error('Error occurred:', error);
  //         if (error?.error?.error == 'error') {
  //           this.errorMessage = error.error.message;
  //         }
  //         throw error;
  //       }),
  //       finalize(async () => {
  //         await this.loader.dismissLoading();
  //       })
  //     )
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log('adddr', res);
  //         if (res?.status == 'success') {
  //           this.errorMessage = '';
  //           if (res?.data?.totalDocs > 0) {
  //             // this.firstTimeCreate = false;
  //             // this.profileData = res?.data[0];
  //             console.log(res?.data);
  //           } else {
  //             // this.edit = true;
  //             // this.presentToast('Update Your Profile', 2000, 'danger');
  //             // this.firstTimeCreate = true;
  //           }
  //         }
  //       },
  //     });
  // }

  async getAllLeads() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    await this.loader.showLoading('Fetching Profile...');

    this.baseApi
      .get(`${urlConfig.driverLeadsPath}`)
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
          if (res?.totals?.count > 0) {
            console.log(res?.data);
            this.upcomingRides = res?.data.filter(
              (item) => item.leadStatus === 'NEW-LEAD' && item.showFlag === true
            );
          }
        }
      });
  }

  acceptRide(ride: any) {
    const leadId = ride._id; // from your response object

    this.baseApi
      .patch(`${urlConfig.driverLeadAcceptPath}/${leadId}`, {})
      .subscribe({
        next: (res) => {
          console.log(res);

          // optional: update UI
          ride.leadStatus = 'CONFIRMED';
          // or remove from list:
          // this.upcomingRides = this.upcomingRides.filter(r => r._id !== leadId);
          this.getAllLeads();
          this.router.navigate(['/my-rides']);
        },
        error: (err) => {
          console.error('Accept ride failed', err);
          // show toast / alert if you want
        },
      });
  }
}
