import { Injector } from "@angular/core";
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NgModel } from "@angular/forms";

export function obtenirFormControl(injector: Injector, controlDefaut: FormControl) {
  let controle: FormControl;
  const ngControl = injector.get(NgControl);
  if (ngControl instanceof FormControlName) {
    controle = injector.get(FormGroupDirective).getControl(ngControl);
  }
  else if (ngControl instanceof FormControlDirective) {
    controle = (ngControl as FormControlDirective).form as FormControl;
  }
  else if (ngControl instanceof NgModel){
    controle = controlDefaut;
  }
  else {
    throw 'Attribut de binding manquant (FormControl, FormControlName, NgModel)';
  }
  return controle;
}
