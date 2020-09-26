import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../shared/model/hotel.model';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelMediaService } from '../shared/service/i.hotel-media.service';
import { IHotelService } from '../shared/service/i.hotel.service';
import { SimpleModalService } from '../shared/service/simple-modal.service';

@Component({
  selector: 'app-hotel-panel',
  templateUrl: './hotel-panel.component.html',
  styleUrls: ['./hotel-panel.component.css']
})
export class HotelPanelComponent implements OnInit {

  public hotels: Hotel[];
  public showHiddenButtons: boolean;
  public showMedia: boolean;
  public hotel: Hotel;
  public selectedHotel: Hotel;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.selectedHotel = new Hotel();
    this.getHotels();
    this.showHiddenButtons = false;
    this.showMedia = false;
    this.modalService.registerModal("delete-hotel-modal");
  }

  public onAddNewHotel(): void {
    this.selectedHotel = new Hotel();
  }

  public onSubmit(): void {
    alert('onSubmit')
  }

  public onDelete(): void {
    this.modalService.open("delete-hotel-modal")
  }

  public okModal(id: string): void {
    if (id === "delete-hotel-modal") {
      const delId: number = this.selectedHotel.id;
      let index: number = -1;

      if (this.hotels !== undefined && this.hotels !== null) {
        index = this.hotels.indexOf(this.selectedHotel);
      }

      if (delId !== null) {
        this.hotelService.deleteHotelById(delId).subscribe(responce => {
          console.log("\n\nat hotel-panel onDelete(): " + JSON.stringify(responce));
          this.hotels.splice(index, 1)
          this.showHiddenButtons = false;
        });
      } else {
        this.hotels.splice(index, 1);
        this.showHiddenButtons = false;
      }
    }
  }

  public onMedia(): void {
    this.showMedia = true;
  }

  public onGoBack(): void {
    this.router.navigate(['booker']);
  }

  public onHotelSelect(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.showHiddenButtons = true;
  }

  public hotelMediaBackToHotel(hotel: Hotel): void {
    alert(hotel);
  }

  public backToHotelEmpty(): void {
    this.showMedia = false;
  }

  private getHotels(): void { // not in use
    this.hotelService.getAllHotels()
      .subscribe(hotels => {
        console.log("\n\nat Hotel getAllHotels() " + JSON.stringify(hotels))
        this.hotels = hotels;
      });
  }
}
