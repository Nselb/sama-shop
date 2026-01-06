import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiResponse } from '@sama-shop/common';
import { ProductDto } from '@sama-shop/shared';
import { catchError, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  products = toSignal(
    this.http.get<ApiResponse<ProductDto[]>>(`${this.baseUrl}/products`).pipe(
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        return of();
      }),
    ),
  );
}
