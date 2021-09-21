import { Injectable } from '@angular/core';
import { Actions} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { State } from './state';

@Injectable()
export class AppEffects {

  /*signalrConnected$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.signalrConnected),
    switchMapTo(from([
      Downloads.actions.load()
    ]))
  ));*/

  constructor(
    private store: Store<State>,
    private actions$: Actions) {
  }
}
