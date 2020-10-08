
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FileLoadInfoModel } from '../shared/model/file-load-info.model';
import { FileUploadService } from '../shared/service/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  @Input() uploadMediaSubject: Observable<void>;
  @Output() uploadSubmit: EventEmitter<any> = new EventEmitter();
  @Output() mediaSubmitButtonDeblock: EventEmitter<boolean> = new EventEmitter();
  public selectedFiles: FileList;
  public currentFile: File;
  public fileName: string;
  public message: String;
  public fileInfos: Observable<any>;
  public uploadInfo: FileLoadInfoModel;
  public eventsSubscription: Subscription;

  constructor(private uploadService: FileUploadService) { }

  public ngOnInit(): void {
    this.uploadInfo = new FileLoadInfoModel();
    this.fileName = "Choose File";
    this.eventsSubscription = this.uploadMediaSubject.subscribe(() => this.callUploadFile());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  public callUploadFile(): void {
    this.uploadFile();
  }

  public uploadFile() {
    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      data => {
        this.uploadInfo = data;
        console.log(JSON.stringify(this.uploadInfo));
        this.message = "The file has been downloaded correctly: ";
        this.fileName = "Choose File";
        this.uploadSubmit.emit(this.uploadInfo);
      },
      err => {
        this.currentFile = undefined;
        this.message = "an error occured while uploading! " + JSON.stringify(err);
      });
    this.selectedFiles = undefined;
  }

  public selectedFile(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length !== 0) {
      this.fileName = this.selectedFiles[0].name;
      this.mediaSubmitButtonDeblock.emit(true);
    } else {
      this.mediaSubmitButtonDeblock.emit(false);
    }
  }
}
