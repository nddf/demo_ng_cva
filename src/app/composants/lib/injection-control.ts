import { Injector } from "@angular/core";
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NgModel } from "@angular/forms";

export function obtenirFormControl(injector: Injector) {
  let controle: FormControl;
  const ngControl = injector.get<NgControl>(NgControl, undefined, {self: true});
  if (ngControl instanceof FormControlName) {
    controle = injector.get<FormGroupDirective>(FormGroupDirective).getControl(ngControl);
  }
  else if (ngControl instanceof FormControlDirective) {
    controle = (ngControl as FormControlDirective).form as FormControl;
  }
  else if (ngControl instanceof NgModel){
    controle = ngControl.control;
  }
  else {
    throw 'Attribut de binding manquant (FormControl, FormControlName, NgModel)';
  }
  return controle;
}
