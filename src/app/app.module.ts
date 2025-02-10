import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule, inject, provideAppInitializer } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AppInitService, initAppData } from "src/services";
import { AuthFormUtil } from "../auth";
import { IconModule } from "../icon/icon.module";
import { HttpInterceptorService } from "../interceptors/http-interceptor.service";
import { LayoutModule } from "../layout/layout.module";
import { ApiModule, Configuration } from "../open-api";
import { PipesModule } from "../pipes";
import { StoreModule } from "../store/store.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [ApiModule.forRoot(() => new Configuration({
            basePath: undefined,
        })),
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        IconModule,
        LayoutModule,
        MatSnackBarModule,
        MatTooltipModule,
        NgxMaskDirective,
        NgxMaskPipe,
        PipesModule,
        StoreModule], providers: [
        AuthFormUtil,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true,
        },
        provideAppInitializer(() => {
        const initializerFn = (initAppData)(inject(AppInitService));
        return initializerFn();
      }),
        provideNgxMask(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
