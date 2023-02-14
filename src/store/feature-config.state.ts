import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetFeatureConfig } from './feature-config.state.actions';
import featureConfig from '../../config/feature-config.json';

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

  @Action(SetFeatureConfig)
  setFeatureConfig({
    getState,
    patchState,
  }: StateContext<FeatureConfigStateInterface>) {
    patchState({
      ...featureConfig,
    });
  }
}
