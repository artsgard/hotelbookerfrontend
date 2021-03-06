import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileLoadInfoModel } from '../shared/model/file-load-info.model';
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
  public showFormMode: boolean;
  public hotels: Hotel[];
  public hotelMedias: HotelMedia[];
  public uploadInfo: FileLoadInfoModel;
  public selectedHotel: Hotel;

  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.selectedHotel = new Hotel();
    this.getHotels();
    this.showHiddenButtons = false;
    this.showMediaButton = false;
    this.showFormMode = false;
    this.showMedia = false;
    this.showForm = false;
    this.modalService.registerModal("delete-hotel-modal");
    this.modalService.registerModal("add-media-modal");
  }

  public onHotelSelect(hotel: Hotel): void {
    if (!this.showFormMode) {
      this.selectedHotel = hotel;
      this.showHiddenButtons = true;
      this.showMediaButton = false;
      this.showForm = true;
      this.showFormMode = true;
    }
  }

  public onAddNewHotel(): void {
    this.selectedHotel = new Hotel();
    this.showMediaButton = true;
    this.showHiddenButtons = false;
    this.showForm = true;
    this.showFormMode = true;
  }

  public onResetForm(): void {
    this.showMediaButton = false;
    this.showFormMode = false;
    this.showMedia = false;
    this.showForm = false;
    this.selectedHotel = new Hotel();
  }

  public onMedia(): void {
    if (this.showFormMode) {
      this.hotelMedias = this.selectedHotel.hotelMedias;
      this.showMedia = true;
    }
  }

  public onSubmit(): void {
    if (this.selectedHotel.hotelMedias.length === 0) {
      this.modalService.open("add-media-modal")
    } else {

      if(this.selectedHotel.id === undefined) {
        this.hotelService.saveHotel(this.selectedHotel).subscribe(hotel => {
          console.log("\n\nat Hotel saveHotel() " + JSON.stringify(hotel));
          this.hotels.push(hotel);
          this.hotelMedias = hotel.hotelMedias;
          this.selectedHotel.hotelMedias = hotel.hotelMedias;
          this.selectedHotel = new Hotel();
          this.showForm = false;
          this.showFormMode = false;
        });
      } else {
        this.hotelService.updateHotel(this.selectedHotel).subscribe(hotel => {
          console.log("\n\nat Hotel updateHotel() " + JSON.stringify(hotel));
          //this.hotels.push(hotel);
          
          this.hotelMedias = hotel.hotelMedias;
          this.selectedHotel.hotelMedias = hotel.hotelMedias;
          this.selectedHotel = new Hotel();
          this.showForm = false;
          this.showFormMode = false;
        });
      }

     
    }
  }

  public onDelete(): void {
    this.modalService.open("delete-hotel-modal");
  }

  public okModal(id: string): void {
    if (id === "delete-hotel-modal") {
      const delId: number = this.selectedHotel.id;
      let index: number = -1;
      index = this.hotels.indexOf(this.selectedHotel);

      this.hotelService.deleteHotelById(delId).subscribe(responce => {
        console.log("\n\nat hotel-panel onDelete()");
        this.hotels.splice(index, 1)
        this.showHiddenButtons = false;
        this.selectedHotel = new Hotel();
      });
    }
    this.showForm = false;
    this.showFormMode = false;
  }

  public onGoBack(): void {
    this.router.navigate(['booker']);
    this.selectedHotel = new Hotel();
  }

  public backToHotelFromMedia(obj: FileLoadInfoModel): void {
    this.uploadInfo = obj;
    this.showMedia = false;
  }

  private getHotels(): void {
    this.hotelService.getAllHotels()
      .subscribe(hotels => {
        console.log("\n\nat Hotel getAllHotels() " + JSON.stringify(hotels))
        this.hotels = hotels;
      });
  }
}
