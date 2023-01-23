import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from 'src/store/store.module';
import { LayoutModule } from 'src/layout/layout.module';
import { HttpInterceptorService } from 'src/interceptors/http-interceptor.service';
import { AppInitService, initAppData } from 'src/services/app-init.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    StoreModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initAppData,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
