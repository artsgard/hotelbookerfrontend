import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { BookerComponent } from './booker/booker.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ClientService } from './shared/service/client.service';
import { IClientService } from './shared/service/i.client.service';
import { IBookerService } from './shared/service/i.booker.service';
import { IHotelService } from './shared/service/i.hotel.service';
import { IHotelMediaService } from './shared/service/i.hotel-media.service';
import { BookerService } from './shared/service/booker.service';
import { HotelService } from './shared/service/hotel.service';
import { HotelMediaService } from './shared/service/hotel-media.service';
import { HotelPanelComponent } from './hotel-panel/hotel-panel.component';
import { SimpleModalService } from './shared/service/simple-modal.service';
import { ModalComponent } from './modal/modal.component';
import { MediaPanelComponent } from './media-panel/media-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    BookerComponent,
    ConfirmationComponent,
    HotelPanelComponent,
    ModalComponent,
    MediaPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NoopAnimationsModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: IClientService, useClass: ClientService },
    { provide: IBookerService, useClass: BookerService },
    { provide: IHotelService, useClass: HotelService },
    { provide: IHotelMediaService, useClass: HotelMediaService },
    { provide: SimpleModalService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
