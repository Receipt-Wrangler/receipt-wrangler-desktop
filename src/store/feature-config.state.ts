import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
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
