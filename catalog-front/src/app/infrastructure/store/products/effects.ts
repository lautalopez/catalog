import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ProductsService} from '../../services/products.service';
import * as productActions from './actions';
import {Product} from '../../models/product.model';

@Injectable()
export class ProductsEffects {

    load$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(productActions.GetAll),
        mergeMap(() => this.productsService.getAll()
            .pipe(
                map((products: Product[]) => productActions.ProductsLoaded({products})),
                catchError(() => EMPTY)
            ))
        )
    );

    constructor(private actions$: Actions,
                private productsService: ProductsService) {
    }
}
