import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomType } from '../shared/enum/room-type.enum';
import { Booker } from '../shared/model/booker.model';
import { Client } from '../shared/model/client.model';
import { Hotel } from '../shared/model/hotel.model';
import { endpoints } from '../shared/service/endpoints';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelService } from '../shared/service/i.hotel.service';
import { SimpleModalService } from '../shared/service/simple-modal.service';

@Component({
  selector: 'app-booker',
  templateUrl: './booker.component.html',
  styleUrls: ['./booker.component.css']
})
export class BookerComponent implements OnInit {
  public client: Client;
  public clients: Client[];
  public hotels: Hotel[];
  public booker: Booker;
  public roomType: RoomType;
  public roomTypes: any[];
  public hotelImg: string;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.roomTypes = Object.values(RoomType);
    const StringIsNumber = value => isNaN(Number(value)) === false;
    this.roomTypes = Object.keys(RoomType).filter(StringIsNumber).map(key => RoomType[key]);
    this.modalService.registerModal("goto-register-modal");
    this.getHotels();
    this.client = this.clientService.getClient();
    this.booker = new Booker();
  }

  public onSubmit(hotel: Hotel) {
    if (this.client != null) {
      this.booker.hotel = hotel;
      this.booker.client = this.client;
      this.bookerService.saveBooker(this.booker).subscribe(booker => {
        console.log("\n\nat Booker saveBooker() " + JSON.stringify(booker))
        this.booker = booker;
        this.router.navigate(['confirmation']);
      });
    } else {
      this.modalService.open("goto-register-modal");
    }
  }

  private getHotels(): void {
    this.hotelService.getAllHotels()
      .subscribe(hotels => {
        console.log("\n\nat Hotel getAllHotels() " + JSON.stringify(hotels))
        this.hotels = hotels;
      });
  }

  public hotelPanel() {
    this.router.navigate(['hotel-panel']);
  }
}
