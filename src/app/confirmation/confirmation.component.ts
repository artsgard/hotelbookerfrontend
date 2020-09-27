import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booker } from '../shared/model/booker.model';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelMediaService } from '../shared/service/i.hotel-media.service';
import { IHotelService } from '../shared/service/i.hotel.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  public booker: Booker;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private router: Router) { }

  ngOnInit(): void {
    this.booker = this.bookerService.getCurrentBooker();
    if (this.booker != undefined) {
      alert("booker infoat confirm\n" + this.booker.nights + "\n" + this.booker.checkInDate + "\n" +
        this.booker.checkOutDate + "\n" +
        this.booker.breakfastIncluded + "\n" +
        this.booker.roomType + "\n" +
        this.booker.hotel.name + "\n" +
        this.booker.finalPrice);
    }
  }

}
