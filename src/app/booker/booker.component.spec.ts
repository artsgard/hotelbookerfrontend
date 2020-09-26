import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookerComponent } from './booker.component';

describe('BookerComponent', () => {
  let component: BookerComponent;
  let fixture: ComponentFixture<BookerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
