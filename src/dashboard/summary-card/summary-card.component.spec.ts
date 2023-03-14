import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardComponent } from './summary-card.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsStoragePlugin } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { UsersResolverService } from 'src/resolvers/users-resolver.service';
import { UsersService } from 'src/api/users.service';

describe('SummaryCardComponent', () => {
  let component: SummaryCardComponent;
  let fixture: ComponentFixture<SummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryCardComponent],
      imports: [
        HttpClientTestingModule,
        NgxsModule.forRoot([]),
        MatCardModule,
        MatListModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user data correctly when there is data', () => {
    const usersService = TestBed.inject(UsersService);
    spyOn(usersService, 'geAmountOwedForUser').and.returnValue(
      of({
        '1': 200,
        '2': -500,
      })
    );

    component.ngOnInit();

    expect(Array.from(component.userOwesMap.entries())).toEqual([['1', '200']]);
    expect(Array.from(component.usersOweMap.entries())).toEqual([
      ['2', '-500'],
    ]);
  });
});
