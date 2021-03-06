import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRoomComponent } from './dialog-room.component';

describe('DialogRoomComponent', () => {
  let component: DialogRoomComponent;
  let fixture: ComponentFixture<DialogRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
