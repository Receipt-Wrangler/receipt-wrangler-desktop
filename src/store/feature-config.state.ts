import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from '@ngxs/store';
import { SetFeatureConfig } from './feature-config.state.actions';

export interface FeatureConfigStateInterface {
  enableLocalSignUp: boolean;
}

@State<FeatureConfigStateInterface>({
  name: 'featureConfig',
  defaults: { enableLocalSignUp: true },
})
@Injectable()
export class FeatureConfigState {
  @Selector()
  static enableLocalSignUp(state: FeatureConfigStateInterface): boolean {
    return state.enableLocalSignUp;
  }

  static hasFeature(feature: string) {
    return createSelector(
      [FeatureConfigState],
      (state: FeatureConfigStateInterface) => {
        return !!(state as any)[feature];
      }
    );
  }

  @Action(SetFeatureConfig)
  setFeatureConfig(
    { patchState }: StateContext<FeatureConfigStateInterface>,
    payload: SetFeatureConfig
  ) {
    patchState({
      enableLocalSignUp: payload.config?.EnableLocalSignUp,
    });
  }
}
