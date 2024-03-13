import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { NgxsModule } from "@ngxs/store";
import { ApiModule } from "../api";
import { AppDataService } from "./app-data.service";

describe("AppDataService", () => {
  let service: AppDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApiModule,
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
        MatSnackBarModule,
      ],
      providers: [AppDataService],
    });
    service = TestBed.inject(AppDataService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
