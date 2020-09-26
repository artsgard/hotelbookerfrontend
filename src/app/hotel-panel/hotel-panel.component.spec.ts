import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPanelComponent } from './hotel-panel.component';

describe('HotelPanelComponent', () => {
  let component: HotelPanelComponent;
  let fixture: ComponentFixture<HotelPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
