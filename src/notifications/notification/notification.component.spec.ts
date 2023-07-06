import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { NotificationComponent } from './notification.component';
import { NotificationsService } from 'src/api/notifications.service';
import { of } from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let service: NotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationComponent],
      imports: [HttpClientTestingModule, NgxsModule.forRoot([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
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
