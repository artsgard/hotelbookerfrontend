import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SimpleModalService } from '../shared/service/simple-modal.service';

@Component({
    selector: 'app-modal',
    template: `
      <div class="modal-container" *ngIf="modalId === currentId">
          <div class="modal-body">
              <div class="modal-title">{{modalTitle}}</div>
              <div class="modal-text">{{modalText}}</div>
              <div class="modal-buttons">
                <button *ngIf="!isInfoModal" type="button"  (click)="sendOkModal()" class="btn-sm btn-danger" [disabled]="false">Yes</button>
                <button type="button"  (click)="closeModal()" class="btn-sm btn-success" [disabled]="false">Close</button>
                </div>
          </div>
      </div>
      <div [ngClass]="{'modal-background': modalId === currentId}"></div>
    `,    
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @Input() modalTitle: string;
    @Input() modalText: string;
    @Input() modalId: string;
    @Input() isInfoModal: boolean;
    @Output() okModal: EventEmitter<string> = new EventEmitter();
    public currentId: string;
    
    constructor(private modalService: SimpleModalService) { }

    ngOnInit(): void {
        this.currentId = ""
        this.modalService.getEmitter().subscribe(id => {
          return this.openModal(id);
        });
    }

    sendOkModal(): void {
      this.okModal.emit(this.modalId);
      this.currentId = ""
    }

    openModal(id: string) {
      this.currentId = id;
    }

    closeModal() {
      this.modalService.close(this.currentId);
      this.currentId = ""
    }
}