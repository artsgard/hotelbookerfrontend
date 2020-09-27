import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HotelMedia } from '../shared/model/hotel-media.model';
import { Hotel } from '../shared/model/hotel.model';
import { IBookerService } from '../shared/service/i.booker.service';
import { IClientService } from '../shared/service/i.client.service';
import { IHotelMediaService } from '../shared/service/i.hotel-media.service';
import { IHotelService } from '../shared/service/i.hotel.service';
import { SimpleModalService } from '../shared/service/simple-modal.service';

@Component({
  selector: 'app-media-panel',
  templateUrl: './media-panel.component.html',
  styleUrls: ['./media-panel.component.css']
})
export class MediaPanelComponent implements OnInit {
  
  @Input() hotelMedias: HotelMedia[];
  @Output() hotelMediaBackToHotel: EventEmitter<HotelMedia[]> = new EventEmitter();
  @Output() backToHotelEmpty: EventEmitter<any> = new EventEmitter();
  public showHiddenButtons: boolean;
  public showForm: boolean;
  public showMedia: boolean;
  public selectedMedia: HotelMedia;


  constructor(private clientService: IClientService, private hotelService: IHotelService, private bookerService: IBookerService,
    private hotelMediaService: IHotelMediaService, private modalService: SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.selectedMedia = new HotelMedia();
    this.showHiddenButtons = false;
    this.showForm = false;
    this.modalService.registerModal("delete-media-modal");
  }

  public onMediaSelect(media: HotelMedia): void {
    this.selectedMedia = media;
    this.showHiddenButtons = true;
    this.showForm = true;
  }

  public onAddNewMedia(): void {
    this.selectedMedia = new HotelMedia();  
    this.showForm = true;
  }

  public onSubmit(): void {
    this.hotelMedias.push( this.selectedMedia);
    this.hotelMediaBackToHotel.emit(this.hotelMedias);
  }

  public onDelete(): void {
    this.modalService.open("delete-media-modal")
  }

  public onGoBack(): void {
    this.backToHotelEmpty.emit();
  }

  public okModal(id: string): void {
    if (id === "delete-Media-modal") {
      const delId: number = this.selectedMedia.id;
      let index: number = -1;
      
      if (this.hotelMedias !== undefined && this.hotelMedias !== null) {
        index = this.hotelMedias.indexOf(this.selectedMedia);
      }

      if (delId !== null) {
        this.hotelMediaService.deleteHotelMediaById(delId).subscribe(responce => {
          console.log("\n\nat Media-panel onDelete(): " + JSON.stringify(responce));
          this.hotelMedias.splice(index, 1)
          this.showHiddenButtons = false;
        });
      } else {
        this.hotelMedias.splice(index, 1);
        this.showHiddenButtons = false;
      }
    }
  }
}
