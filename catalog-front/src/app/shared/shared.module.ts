import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainContainerComponent} from './components/main-container/main-container.component';
import {MatIconModule} from '@angular/material/icon';

const COMPONENTS = [
    MainContainerComponent
]

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        CommonModule,
        MatIconModule,
        ...COMPONENTS
    ]
})
export class SharedModule {
}
