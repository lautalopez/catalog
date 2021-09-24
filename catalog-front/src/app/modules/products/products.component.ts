import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../infrastructure/store/state';
import {Observable} from 'rxjs';
import * as ProductStore from '../../infrastructure/store/products';
import * as ProductCollection from '../../infrastructure/store/collections/products';
import {Product} from '../../infrastructure/models/product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    products$: Observable<any>;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.products$ = this.store.select(ProductStore.selectAll);
        this.store.dispatch(ProductStore.GetAll());
    }

    getRandomString(length) {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    add() {
        this.store.dispatch(ProductStore.Add({
            product: {
                name: this.getRandomString(8)
            } as Product
        }))
    }

    delete(id) {
        this.store.dispatch(ProductStore.Delete({id}));
    }
}
