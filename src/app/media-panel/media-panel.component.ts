import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FileLoadInfoModel } from '../shared/model/file-load-info.model';
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
  @Output() backToHotel: EventEmitter<any> = new EventEmitter();
  public showHiddenButtons: boolean;
  public showForm: boolean;
  public showMedia: boolean;
  public submitButtonDeBlock: boolean;
  public selectedMedia: HotelMedia;
  public uploadMediaSubjectEvent: Subject<void>;
  public uploadInfo: FileLoadInfoModel;

  constructor(private hotelMediaService: IHotelMediaService, private modalService: 
    SimpleModalService, private router: Router) { }

  ngOnInit(): void {
    this.selectedMedia = new HotelMedia();
    this.showHiddenButtons = false;
    this.showForm = false;
    this.submitButtonDeBlock = false;
    this.modalService.registerModal("delete-media-modal");
    this.uploadMediaSubjectEvent = new Subject<void>();
  }

  public onMediaSelect(media: HotelMedia): void {
    this.selectedMedia = media;
    this.showHiddenButtons = true;
    this.showForm = true;
  }

  public mediaSubmitButtonDeblock(flag): void {
    this.submitButtonDeBlock = flag;
  }

  public onAddNewMedia(): void {
    this.selectedMedia = new HotelMedia();
    this.showForm = true;
  }

  public uploadSubmit(obj: FileLoadInfoModel): void {
    this.selectedMedia.tempFileName = obj.fileName;
    this.selectedMedia.tempDirName = obj.tempImgDir;
    this.uploadInfo = obj;
    const ind: number = this.hotelMedias.indexOf(this.selectedMedia);
    if (ind !== -1) {
      this.hotelMedias.splice(ind, 1);
      this.hotelMedias.push(this.selectedMedia);
    }
    const flag: any = this.selectedMedia.id
    if(flag === undefined) {
      this.hotelMedias.push(this.selectedMedia);
    }
    this.backToHotel.emit(this.uploadInfo);
  }

  public onSubmit(): void {
    this.uploadMediaSubjectEvent.next();
    // will call uploadSubmit via upload component
  }

  public onDelete(): void {
    this.modalService.open("delete-media-modal")
  }

  public onGoBack(): void {
    this.selectedMedia = new HotelMedia();
    this.backToHotel.emit();
  }

  public okModal(id: string): void {
    if (id === "delete-media-modal") {
      const delId: number = this.selectedMedia.id;
      let index: number = -1;
      index = this.hotelMedias.indexOf(this.selectedMedia);

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
