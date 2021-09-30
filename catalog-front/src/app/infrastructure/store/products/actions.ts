import {createAction, props} from '@ngrx/store';
import {Product} from '../../models/product.model';
import {Guid} from 'guid-typescript';

const prefix = '[Product] ';

export const Add = createAction(prefix + 'Add', props<{ product: Product }>());

export const Delete = createAction(prefix + 'Delete', props<{ id: Guid }>());

export const GetAll = createAction(prefix + 'Get all');

export const ProductsLoaded = createAction(prefix + 'Loaded', props<{ products: Product[]}>());

export const Create = createAction(prefix + 'Create', props<{ product: Product}>());
