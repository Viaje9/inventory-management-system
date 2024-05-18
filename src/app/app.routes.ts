import { Routes } from '@angular/router';
import { LayoutComponent } from './core/comeponents/layout/layout.component';
import { AddInventoryComponent } from './pages/add-inventory/add-inventory.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'addInventory'
      },
      {
        path: 'addInventory',
        component: AddInventoryComponent,
      },
    ],
  },
];
