import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent:() => import ('./pages/order/order.page').then(m => m.OrderPage),
  }
];
