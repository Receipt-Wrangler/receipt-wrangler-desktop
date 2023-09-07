import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Directive({
  selector: '[appDevelopment]',
})
export class DevelopmentDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    const isProd = environment.isProd;

    if (!isProd) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (isProd) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
