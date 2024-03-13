import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { NgxsModule, Store } from "@ngxs/store";
import { of } from "rxjs";
import { ToggleIsSidebarOpen } from "src/store/layout.state.actions";
import { ApiModule, AuthService } from "../../api";
import { Logout } from "../../store";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        ApiModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        NgxsModule.forRoot([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle sidebar", () => {
    const store = spyOn(TestBed.inject(Store), "dispatch");
    component.toggleSidebar();

    expect(store).toHaveBeenCalledOnceWith(new ToggleIsSidebarOpen());
  });

  it("should log the user out", () => {
    const router = spyOn(TestBed.inject(Router), "navigate");

    const store = spyOn(TestBed.inject(Store), "dispatch");
    store.and.returnValue(of(undefined) as any);

    const authService = spyOn(TestBed.inject(AuthService), "logout");
    authService.and.returnValue(of(undefined) as any);

    component.logout();

    expect(authService).toHaveBeenCalledTimes(1);
    expect(store).toHaveBeenCalledOnceWith(new Logout());
    expect(router).toHaveBeenCalledWith(["/"]);
  });
});
