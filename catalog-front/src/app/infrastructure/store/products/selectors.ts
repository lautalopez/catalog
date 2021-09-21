import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PRODUCT_KEY} from './key';
import {ProductsState} from './state';

export const selectProductState = createFeatureSelector<ProductsState>(PRODUCT_KEY);

export const selectAll = createSelector(
    selectProductState,
    (state) => state.items
);

/*export const selectId = createSelector(
    selectPlayerState,
    (state) => state.video?.id
);*/

/*
export const selectLoading = createSelector(
    selectPlayerState,
    (state) => state.loading
);

export const selectPlaying = createSelector(
    selectPlayerState,
    (state) => state.playing
);

export const selectStatusModel = createSelector(
    selectId,
    selectLoading,
    selectPlaying,
    (id, loading, playing) => ({id, loading, playing})
);
*/
