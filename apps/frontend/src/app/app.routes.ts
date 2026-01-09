import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((m) => m.ProductsComponent),
  },
  {
    path: 'products/:slug',
    loadComponent: () =>
      import('./products/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
  },
];
