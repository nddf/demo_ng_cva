import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AdresseForm } from './adresse-form';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EntreeTexteComponent } from '../commun/entree-texte/entree-texte.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationEntreeTexte } from 'src/app/validations/validations-entree-texte';


@Component({
  selector: 'adresse',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EntreeTexteComponent, MatFormFieldModule, MatInputModule ],
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

    let erreurs: any = {};
    erreurs = this.ajouterErreursControle(erreurs, "porte");
    erreurs = this.ajouterErreursControle(erreurs, "numeroCivique");
    erreurs = this.ajouterErreursControle(erreurs, "rue");
    erreurs = this.ajouterErreursControle(erreurs, "codePostal");
    erreurs = this.ajouterErreursControle(erreurs, "ville");
    return erreurs;
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

  validateurAQuebec = ValidationEntreeTexte.validerEgalite('Québec');
}
