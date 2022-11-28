import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AdresseForm } from './adresse-form';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EntreeTexteComponent } from '../commun/entree-texte/entree-texte.component';

@Component({
  selector: 'adresse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EntreeTexteComponent],
  templateUrl: './adresse.component.html',
  styleUrls: ['./adresse.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdresseComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdresseComponent),
      multi: true
    }
  ]
})
export class AdresseComponent implements ControlValueAccessor, Validator, OnDestroy, OnInit, OnChanges {

  @Input() adresseAQuebec: boolean = false;

  private abonnements: Subscription[] = [];
  public adresseForm = new AdresseForm();

  onTouched = () => {};
  isDisabled: boolean = false;
  onValidatorChanged = () => {};

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.adresseAQuebec) {
      this.adresseForm.get('ville')?.addValidators(this.validateurAQuebec);
    } else {
      this.adresseForm.get('ville')?.removeValidators(this.validateurAQuebec);
    }
    this.adresseForm.get('ville')?.updateValueAndValidity();
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    if (this.adresseForm.valid) {
      return null;
    }

    let errors: any = {};

    errors = this.ajouterErreursControle(errors, "porte");
    errors = this.ajouterErreursControle(errors, "numeroCivique");
    errors = this.ajouterErreursControle(errors, "rue");
    errors = this.ajouterErreursControle(errors, "codePostal");
    errors = this.ajouterErreursControle(errors, "ville");

    return errors;
  }

  ajouterErreursControle(allErrors: any, controlName:string) {

    const errors = {...allErrors};

    const controlErrors = this.adresseForm.controls[controlName].errors;

    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChanged = fn;
  }

  ngOnInit(): void {
    this.adresseForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.abonnements.forEach(a => {if (a && !a.closed) a.unsubscribe();});
  }

  writeValue(obj: any): void {
    obj && this.adresseForm.setValue(obj, {emitEvent: false});
  }

  public registerOnChange(fn: any): void {
    fn && this.abonnements.push(this.adresseForm.valueChanges.subscribe(fn));
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.adresseForm.disable() : this.adresseForm.enable();
  }

  validateurAQuebec = (ctrl: AbstractControl) => {
    if (ctrl.value !== 'Québec') {
      return {'AdresseDoitEtreAQuebec': true}
    }
    return null;
  }
}
