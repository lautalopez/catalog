import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {ProductStore} from '../../../infrastructure/store/products';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

    public form: FormGroup;

    constructor(private fb: FormBuilder,
                private store: Store) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required]
        });
        this.form.valueChanges.subscribe(console.log)
    }

    create() {
        if (!this.form.valid) {
            return;
        }
        this.store.dispatch(ProductStore.actions.Create({product: this.form.value}))
    }
}
