import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApiModule,
  AppInitService,
  AuthFormUtil,
  initAppData,
  PipesModule,
} from '@receipt-wrangler/receipt-wrangler-core';

import { IconModule } from '../icon/icon.module';
import { HttpInterceptorService } from '../interceptors/http-interceptor.service';
import { LayoutModule } from '../layout/layout.module';
import { StoreModule } from '../store/store.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AppDataService,
  initAppDataService,
} from 'src/services/app-data.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    IconModule,
    LayoutModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxMaskDirective,
    NgxMaskPipe,
    StoreModule,
    PipesModule,
  ],
  providers: [
    AuthFormUtil,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAppDataService,
      deps: [AppDataService],
      multi: true,
    },
    provideNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
