import {
  HttpErrorResponse,
  HttpEvent, HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class BadRequestsInterceptor implements HttpInterceptor {

  constructor(
    public _snackBar: MatSnackBar
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((err: HttpEvent<any>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400 || err.status === 403) {
            if (err.error) {
              this._snackBar.open(err.error['message'], undefined, {
                duration: 1000
              });
            }
            else {
              this._snackBar.open('error', undefined, {
                duration: 1000
              });
            }
          }
          if (err.status === 500) {
            this._snackBar.open('Something went wrong.', undefined, {
              duration: 1000
            });
          }
          if (err.status === 0) {
            this._snackBar.open('Fatal error', undefined, {
              duration: 1000,
            });
          }
          if (err.status === 404) {
            this._snackBar.open('Not found', undefined, {
              duration: 1000,
            });
          }
        }
      }),
      catchError(err => {
        if (err.status === 400 || err.status === 403 || err.status === 401) {
          if (err.error) {
            if (err.error['message'] === undefined) {
              this._snackBar.open(JSON.parse(err.error)['message'], undefined, {
                duration: 1000
              });
            } else {
              this._snackBar.open(err.error['message'], undefined, {
                duration: 1000
              });
            }
          }
          else {
            this._snackBar.open('error', undefined, {
              duration: 1000
            });
          }
        }
        if (err.status === 500) {
          this._snackBar.open('Something went wrong.', undefined, {
            duration: 1000
          });
        }
        if (err.status === 0) {
          this._snackBar.open('Fatal error', undefined, {
            duration: 1000,
          });
        }
        if (err.status === 404) {
          this._snackBar.open('Not found', undefined, {
            duration: 1000,
          });
        }
        return throwError(err.error);
      })
    )
  }

}
