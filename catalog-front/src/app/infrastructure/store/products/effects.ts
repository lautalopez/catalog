import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {actions} from '../collections/products';
import {first, switchMap} from 'rxjs/operators';
import {Action, Store} from '@ngrx/store';
import {State} from '../state';

@Injectable()
export class ProductsEffects {

/*  load$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.load),
    switchMap(action => this.store.select(Player.selectId).pipe(
      first(),
      switchMap(currentId => {
        if (currentId === action.id) {
          return EMPTY;
        }
        return this.store.select(Videos.selectAll).pipe(first()).pipe(
          switchMap(videos => {
            const video = videos.find(v => v.id === action.id);
            if (!video) {
              return ([actions.clear()]);
            }
            return this.streamsService.getAudioStreamInfo(action.id).pipe(
              switchMap(streamInfo => ([actions.loaded({ video, streamInfo, autoPlay: action.autoPlay || false })]))
            );
          })
        );
      })
    ))
  ));*/

  constructor(
    private actions$: Actions,
    private store: Store<State>) {
  }
}
