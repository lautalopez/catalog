import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {Product} from '../models/product.model';
import {Guid} from 'guid-typescript';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('http://localhost:5000/items');
    }
}
