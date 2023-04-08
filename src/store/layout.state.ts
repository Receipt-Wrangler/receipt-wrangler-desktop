import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToggleIsSidebarOpen } from './layout.state.actions';

export interface LayoutStateInterface {
  isSidebarOpen: boolean;
}

@State<LayoutStateInterface>({
  name: 'layout',
  defaults: {
    isSidebarOpen: false,
  },
})
@Injectable()
export class LayoutState {
  @Selector()
  static isSidebarOpen(state: LayoutStateInterface): boolean {
    return state.isSidebarOpen;
  }

  @Action(ToggleIsSidebarOpen)
  setIsSidebarOpen({
    getState,
    patchState,
  }: StateContext<LayoutStateInterface>) {
    patchState({
      isSidebarOpen: !getState().isSidebarOpen,
    });
  }
}
