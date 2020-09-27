import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomType } from '../shared/enum/room-type.enum';
import { Booker } from '../shared/model/booker.model';
import { Client } from '../shared/model/client.model';
import { Hotel } from '../shared/model/hotel.model';
import { endpoints } from '../shared/service/endpoints';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelMediaService } from '../shared/service/i.hotel-media.service';
import { IHotelService } from '../shared/service/i.hotel.service';
import { SimpleModalService } from '../shared/service/simple-modal.service';

const { imgPath } = endpoints;

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
    //this.roomTypes = Object.values(RoomType);
    // filter not a number
    this.modalService.registerModal("goto-register-modal");
    this.getHotels();
    this.roomTypes = ["SINGLE", "DOUBLE", "TRIPLE"];
    this.booker = new Booker();
    this.client = new Client();
  }

  public onSubmit(hotel: Hotel) {
    this.clientService.getClient().subscribe(client => {
      console.log("\n\has client " + JSON.stringify(client));
      if (client != null) {
        this.booker.hotel = hotel;
        this.booker.client = client;
        this.bookerService.saveBooker(this.booker).subscribe(booker => {
          //console.log("\n\nat Booker saveBooker() " + JSON.stringify(booker))
          this.booker = booker;
          this.router.navigate(['confirmation']);
        });
      } else {
        this.modalService.open("goto-register-modal");
      }

    });
  }

  public hotelPanel() {
    this.router.navigate(['hotel-panel']);
  }

  private getHotels(): void {
    this.hotelService.getAllHotels()
      .subscribe(hotels => {
        console.log("\n\nat Hotel getAllHotels() " + JSON.stringify(hotels))
        this.hotels = hotels;
      });
  }

}
