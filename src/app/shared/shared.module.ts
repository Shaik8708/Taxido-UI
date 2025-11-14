import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, TabsComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, SideBarComponent, TabsComponent],
})
export class SharedModule {}
