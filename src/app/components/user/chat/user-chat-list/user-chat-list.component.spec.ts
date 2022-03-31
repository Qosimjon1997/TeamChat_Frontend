import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChatListComponent } from './user-chat-list.component';

describe('UserChatListComponent', () => {
  let component: UserChatListComponent;
  let fixture: ComponentFixture<UserChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserChatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
