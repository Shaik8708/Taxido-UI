import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  loading: any;
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(message: any) {
    if (!this.loading) {
      this.loading = await this.loadingCtrl.create({
        message: message,
      });

      await this.loading.present();
    }
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
