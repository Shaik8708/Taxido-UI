import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class Action {
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) {}
  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Please Login',
      buttons: [
        {
          text: 'Login',
          handler: () => {
            this.handleAction('login');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handleAction('cancel');
          },
        },
      ],
    });

    await actionSheet.present();
  }
  async presentActionProductSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Product Type',
      buttons: [
        {
          text: 'Add  PPE Product',
          handler: () => {
            this.handleAction('add-ppe');
          },
        },
        {
          text: 'Add  RENT Product',

          handler: () => {
            this.handleAction('add-rent');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handleAction('cancel');
          },
        },
      ],
    });

    await actionSheet.present();
  }
  handleAction(action: string) {
    // Handle the action based on the provided data
    switch (action) {
      case 'login':
        this.router.navigateByUrl('/login');
        break;
      case 'add-ppe':
        this.router.navigateByUrl('/add-ppe');
        break;
      case 'add-rent':
        this.router.navigateByUrl('/add-rent');
        break;
      default:
      // Handle other actions or do nothing
    }
  }
}
