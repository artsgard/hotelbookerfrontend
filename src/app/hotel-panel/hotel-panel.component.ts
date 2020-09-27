import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelMedia } from '../shared/model/hotel-media.model';
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

  public showHiddenButtons: boolean;
  public showMediaButton: boolean;
  public showMedia: boolean;
  public showForm: boolean;
  public hotels: Hotel[];
  public hotelMedias: HotelMedia[];
  public hotel: Hotel;
  public selectedHotel: Hotel;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.selectedHotel = new Hotel();
    this.getHotels();
    this.showHiddenButtons = false;
    this.showMediaButton= false;
    this.showMedia = false;
    this.showForm = false;
    this.modalService.registerModal("delete-hotel-modal");
    this.modalService.registerModal("add-media-modal");
  }

  public onHotelSelect(hotel: Hotel): void {
    this.selectedHotel = hotel;
    this.showHiddenButtons = true;
    this.showMediaButton= false;
    this.showForm = true;
  }

  public onAddNewHotel(): void {
    this.selectedHotel = new Hotel(); 
    this.showMediaButton= true;
    this.showHiddenButtons = false;
    this.showForm = true;
  }

  public onMedia(): void {
    this.hotelMedias = this.selectedHotel.hotelMedias;
    /*
    if (this.hotelMedias === undefined) {
      this.hotelMedias = [];
    }
    */
    this.showMedia = true;
  }

  public onSubmit(): void {
    alert(JSON.stringify(this.selectedHotel));
    if (this.selectedHotel.hotelMedias.length === 0 ) {
      this.modalService.open("add-media-modal")
    } else {
     this.hotelService.saveHotel(this.selectedHotel).subscribe(hotels => {
      alert("\n\nat Hotel saveHotel() " + JSON.stringify(hotels))
    });
    }
  }

  public onDelete(): void {
    alert('delete')
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

  public onGoBack(): void {
    //this.router.navigate(['booker']);
    this.modalService.open("delete-hotel-modal")
  }

  public hotelMediaBackToHotel(medias: HotelMedia[]): void {
    this.showMedia = false;
    const that = this;
    medias.forEach(function (value) {
      that.selectedHotel.hotelMedias.push(value);
    }); 
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
