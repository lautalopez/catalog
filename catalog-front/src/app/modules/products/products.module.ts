import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products.component';
import {SharedModule} from '../../shared/shared.module';
import { NewProductComponent } from './new-product/new-product.component';


@NgModule({
    declarations: [
        ProductsComponent,
        NewProductComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
    ]
})
export class ProductsModule {
}
