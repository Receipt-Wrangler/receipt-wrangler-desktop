import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/store/auth.state';

/**
 * Add the template content to the DOM unless the condition is true.
 */
@Directive({ selector: '[appRole]' })
export class RoleDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private store: Store
  ) {}

  @Input() set appRole(role: string) {
    const userRole = this.store.selectSnapshot(AuthState.userRole);
    const hasRole = role === userRole;

    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}