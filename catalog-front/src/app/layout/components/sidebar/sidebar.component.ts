import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/main/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/main/user-profile', title: 'User Profile', icon: 'person', class: ''},
    {path: '/main/table-list', title: 'Table List', icon: 'content_paste', class: ''},
    {path: '/main/typography', title: 'Typography', icon: 'library_books', class: ''},
    {path: '/main/icons', title: 'Icons', icon: 'bubble_chart', class: ''},
    {path: '/main/maps', title: 'Maps', icon: 'location_on', class: ''},
    {path: '/main/notifications', title: 'Notifications', icon: 'notifications', class: ''},
    {path: '/main/products', title: 'Products', icon: 'product', class: ''},
    {path: '/main/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro'},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    }
}
