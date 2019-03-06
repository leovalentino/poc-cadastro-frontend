import { Directive } from '@angular/core';
import { Validator, ValidatorFn, FormControl, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { CpfCnpjUtil } from './cpf-util';


function validarCpfFactory(): ValidatorFn {
  return (c: AbstractControl) => {
    let cpfEhValido = CpfCnpjUtil.validarCpf(c.value);

    if (cpfEhValido) {
      return null;
    } else {
      return {
        cpfValidador: {
          cpfEhValido: false
        }
      }
    }
  }
}

@Directive({
  selector: '[cpfValidador][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CpfValidadorComponent, multi: true }
  ]
})
export class CpfValidadorComponent implements Validator {

  validator: ValidatorFn;

  constructor() {
    this.validator = validarCpfFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }

}