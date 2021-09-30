import {Component, Inject, inject, Injectable, InjectionToken, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {State} from '../../infrastructure/store/state';
import {interval, Observable, Subject} from 'rxjs';
import {ProductStore} from '../../infrastructure/store/products';
import {Product} from '../../infrastructure/models/product.model';
import {map, take} from 'rxjs/operators';

/*
export interface TimerProvider {
    getDate()
}*/

/*
export const TIMER = new InjectionToken<TimerProvider>('TIMER', {
    factory() {
        const getDate = () => {
            const activatedRoute = new Subject<Date>();

            setInterval(() => {
                activatedRoute.next(new Date())
                console.log('still here')
            }, 1000);
            activatedRoute.asObservable()
        }


        return getDate();
    },
});
*/
/*
export const TIMER = new InjectionToken<TimerProvider>('TIMER');*/
/*
function timerServiceProviderFactory(): TimerService {
    return new TimerService();
}*/

/*function AutoUnsub() {
    return (constructor) => {
        const orig = constructor.prototype.ngOnDestroy
        const pepe = constructor.prototype.ngOnInit
        constructor.prototype.ngOnInit = function (...args) {
            console.log('im here now')
            pepe.apply(this, args)
        }
        /!*        constructor.prototype.ngOnDestroy = function() {
                    for(const prop in this) {
                        const property = this[prop]
                        if(typeof property.subscribe === "function") {
                            property.unsubscribe()
                        }
                    }
                    orig.apply()
                }*!/
    }
}

@Injectable()
export class TimerService implements TimerProvider, OnDestroy {
    subscription;
    date$ = new Subject();

    constructor() {
        const interval$ = interval(1000);

        interval$.pipe(
            map(_ => this.date$.next(new Date()))
        ).subscribe()
    }

    getDate() {
        return this.date$.asObservable();
    }

    ngOnDestroy() {
    }
}*/


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
/*    providers: [
        {
            provide: TIMER,
            useFactory: timerServiceProviderFactory
        }
    ]*/
})
export class ProductsComponent implements OnInit {

    products$: Observable<any>;

    constructor(private store: Store<State>) {
    }

    ngOnInit(): void {
        this.products$ = this.store.select(ProductStore.selectors.selectAll);
        this.store.dispatch(ProductStore.actions.GetAll());
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
        this.store.dispatch(ProductStore.actions.Add({
            product: {
                name: this.getRandomString(8)
            } as Product
        }))
    }

    delete(id) {
        this.store.dispatch(ProductStore.actions.Delete({id}));
    }
}
