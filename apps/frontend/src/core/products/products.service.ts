import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiFailure, ApiSuccess, ProductDto } from '@sama-shop/common';
import { catchError, map, of, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api';

  products = toSignal(
    this.http.get<ApiSuccess<ProductDto[]>>(`${this.baseUrl}/products`).pipe(
      map((response) => response),
      shareReplay(1),
      catchError((err) => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          const failure = err.error as ApiFailure | undefined;

          if (failure?.success === false) {
            console.error('API Failure:', failure.error);
          } else {
            console.error('HTTP Error:', err.status, err.message);
          }
        } else {
          console.error('Unknown error:', err);
        }
        return of(undefined);
      }),
    ),
  );

  getProductBySlug(slug: string) {
    return this.http
      .get<ApiSuccess<ProductDto>>(`${this.baseUrl}/products/${slug}`)
      .pipe(
        map((response) => response),
        catchError((err) => {
          console.error(err);
          if (err instanceof HttpErrorResponse) {
            const failure = err.error as ApiFailure | undefined;

            if (failure?.success === false) {
              console.error('API Failure:', failure.error);
            } else {
              console.error('HTTP Error:', err.status, err.message);
            }
          } else {
            console.error('Unknown error:', err);
          }
          return of(undefined);
        }),
      );
  }
}
