import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './api/auth.service';
import { CategoryService } from './api/category.service';
import { CommentService } from './api/comment.service';
import { DashboardService } from './api/dashboard.service';
import { FeatureConfigService } from './api/featureConfig.service';
import { GroupsService } from './api/groups.service';
import { NotificationsService } from './api/notifications.service';
import { PromptService } from './api/prompt.service';
import { ReceiptService } from './api/receipt.service';
import { ReceiptImageService } from './api/receiptImage.service';
import { ReceiptProcessingSettingsService } from './api/receiptProcessingSettings.service';
import { SearchService } from './api/search.service';
import { SystemEmailService } from './api/systemEmail.service';
import { SystemTaskService } from './api/systemTask.service';
import { TagService } from './api/tag.service';
import { UserService } from './api/user.service';
import { UserPreferencesService } from './api/userPreferences.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
