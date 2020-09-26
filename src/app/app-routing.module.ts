import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookerComponent } from './booker/booker.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HotelPanelComponent } from './hotel-panel/hotel-panel.component';
import { MediaPanelComponent } from './media-panel/media-panel.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booker', component: BookerComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'hotel-panel', component: HotelPanelComponent },
  { path: 'media-panel', component: MediaPanelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }