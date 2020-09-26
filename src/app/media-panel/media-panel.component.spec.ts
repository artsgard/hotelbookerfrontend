import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPanelComponent } from './media-panel.component';

describe('MediaPanelComponent', () => {
  let component: MediaPanelComponent;
  let fixture: ComponentFixture<MediaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
