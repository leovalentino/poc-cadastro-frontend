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
    console.log(error);

    if (error.status == 401) {
      return throwError(this.toast.errorToastr(error.error.message, 'Usuário sem autorização'))
    } else if (error.status == 503) {
      return throwError(this.toast.errorToastr(error.error.message, 'Serviço indisponível'))
    }

    return throwError(this.toast.errorToastr(error.error.message, 'Erro inesperado'))
  }

}
