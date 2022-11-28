import { Component, ElementRef, forwardRef, Injector, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormControlDirective, FormControlName, FormGroupDirective, FormsModule, NgControl, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { obtenirFormControl } from '../../lib/injection-control';
import { Subscription } from 'rxjs';

@Component({
  selector: 'entree-texte[formControlName], entree-texte[formControl], entree-texte[ngModel]',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './entree-texte.component.html',
  styleUrls: ['./entree-texte.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntreeTexteComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EntreeTexteComponent),
      multi: true
    },
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ]
})
export class EntreeTexteComponent implements ControlValueAccessor, Validator {

    controle!: FormControl ;
    @ViewChild('input') input: ElementRef | null = null;

    public entreeTexte: string = '';
    public onChanged = (valeur: any) => {};
    public onTouched = () => {};
    isDisabled: boolean = false;
    touched = false;
    public estEnErreur: boolean = false;

    constructor() { }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      /*
        Effectuer ici des validations supplémentaires au besoin.
        Traiter les éléments de style en cas d'erreur.
      */
      this.estEnErreur = !control.valid;
      return null;
    }

    writeValue(obj: any): void {
      this.entreeTexte = obj;
    }

    registerOnChange(fn: any): void {
      this.onChanged = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
      this.isDisabled = disabled;
    }

    markAsTouched() {
      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    }
}
