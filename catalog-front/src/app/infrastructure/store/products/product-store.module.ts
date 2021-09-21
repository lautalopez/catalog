import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer';
import {ProductsEffects} from './effects';
import {PRODUCT_KEY} from './key';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PRODUCT_KEY, reducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductStoreModule { }
