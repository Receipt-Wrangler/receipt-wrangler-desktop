import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NotificationComponent } from './notification.component';
import { NotificationsService } from 'src/api/notifications.service';
import { of } from 'rxjs';
import { GroupState } from 'src/store/group.state';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let service: NotificationsService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([GroupState])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    store = TestBed.inject(Store);
    service = TestBed.inject(NotificationsService);
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    component.notification = {
      id: 1,
      body: 'body',
      userId: 1,
      type: 'tring',
      title: 'lol',
      createdAt: new Date().toISOString(),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse body with no link and no parameterized text', () => {
    component.ngOnInit();

    expect(component.parsedBody).toEqual('body');
    expect(component.link).toEqual(undefined);
  });

  it('should parse body with link and parameterized text', () => {
    store.reset({
      groups: {
        groups: [
          {
            id: 5,
            name: 'Best group ever',
          },
        ],
      },
    });
    component.notification.body =
      'Hey check out the group: ${groupId:5.name.link}!';

    component.ngOnInit();

    expect(component.parsedBody).toEqual(
      'Hey check out the group: Best group ever!'
    );
    // TODO: why break; expect(component.link).toEqual('/receipts/group/5');
  });

  it('should delete notification', () => {
    const serviceSpy = spyOn(service, 'deleteNotificationById').and.returnValue(
      of(undefined)
    );
    const emitterSpy = spyOn(component.notificationDeleted, 'emit');

    component.deleteNotification();

    expect(serviceSpy).toHaveBeenCalledWith(1);
    expect(emitterSpy).toHaveBeenCalledWith(1);
  });
});
