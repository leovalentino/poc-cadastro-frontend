import { HttpErrorResponse } from '@angular/common/http'
import { ToastrManager, Toastr } from 'ng6-toastr-notifications';
import { OnInit, Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class TratarErro implements OnInit {

  constructor(public toast: ToastrManager) { }

  ngOnInit(): void {

  }

  handleError(error: HttpErrorResponse | any) {
    let errorMessage: string
    console.log(error)
    if (error instanceof HttpErrorResponse) {
      errorMessage = `Erro ${error.status} ao acessar a URL ${error.url} - ${error.statusText}`;
      return throwError(this.toast.errorToastr(error.message, 'Erro inesperado'))
    } else {
      errorMessage = error.toString()
    }
    return throwError(this.toast.errorToastr(error.error.message, 'Erro inesperado'))
  }

}
