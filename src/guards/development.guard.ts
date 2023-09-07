import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment.development';

export const developmentGuard: CanActivateFn = (route, state) => {
  return !environment.isProd;
};
