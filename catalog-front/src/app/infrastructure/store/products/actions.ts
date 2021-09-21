import {createAction, props} from '@ngrx/store';
import {Product} from '../../models/product.model';
import {Guid} from 'guid-typescript';

const prefix = '[Product] ';

export const Add = createAction(prefix + 'Add', props<{ product: Product }>());

export const Delete = createAction(prefix + 'Delete', props<{ id: Guid }>());
