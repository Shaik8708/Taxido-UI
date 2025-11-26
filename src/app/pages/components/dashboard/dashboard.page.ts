import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { Loader } from 'src/app/services/loader';
import urlConfig from '../../../config/url.config.json';
import { Base } from 'src/app/services/base-api/base';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  constructor(private loader: Loader, private baseApi: Base) {}

  ngOnInit() {
    this.getMyProflle();
  }

  async getMyProflle() {
    // this.username = this.cookieService?.get('asp_dh_14');
    // this.dealerId = this.cookieService?.get('asp_dp_iy');
    // this.phoneNumber = this.cookieService?.get('asp_dphn');
    // this.email = this.cookieService?.get('asp_de_9i')
    // this.fullName = this.cookieService?.get('asp_dh_12')
    await this.loader.showLoading('Fetching Profile...');

    // this.api.getUserProfile(userId)
    const payload = {
      // collectionName: urlConfig.ppeProducts
      collectionName: 'leads',
      // dealerId:this.dealerId
    };
    this.baseApi
      .post(`${urlConfig.getAllPath}`, payload)
      .pipe(
        catchError((error) => {
          console.error('Error occurred:', error);
          throw error;
        }),
        finalize(async () => {
          await this.loader.dismissLoading();
        })
      )
      .subscribe({
        next: (res: any) => {
          console.log('adddr', res);
          if (res?.status == 'success') {
            if (res?.data?.totalDocs > 0) {
              // this.firstTimeCreate = false;
              // this.profileData = res?.data[0];
              console.log(res?.data);
            } else {
              // this.edit = true;
              // this.presentToast('Update Your Profile', 2000, 'danger');
              // this.firstTimeCreate = true;
            }
          }
        },
      });
  }
}
