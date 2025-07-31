import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        pathMatch: 'full',
        component: Home
    },
    {
        path: 'todos',
        pathMatch: 'full',
        component: Home
    },
    {
        path: 'rewards',
        pathMatch: 'full',
        component: Home
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
    }
];
