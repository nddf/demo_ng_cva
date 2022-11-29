import { AfterViewInit, Component, ElementRef, forwardRef, Injector, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, FormControlDirective, FormControlName, FormGroupDirective, FormsModule, NgControl, NgModel, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { obtenirFormControl } from '../../lib/injection-control';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'entree-texte[formControlName], entree-texte[formControl], entree-texte[ngModel]',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './entree-texte.component.html',
  styleUrls: ['./entree-texte.component.css'],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntreeTexteComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EntreeTexteComponent),
      multi: true
    }
  ]
})
export class EntreeTexteComponent implements ControlValueAccessor, Validator, AfterViewInit, OnDestroy {

    private abonnements: Subscription[] = [];
    public entreeTexte: string = '';
    public onTouched = () => {};
    isDisabled: boolean = false;
    touched = false;
    public estEnErreur: boolean = false;

    controle: FormControl = this.formBuilder.control('');

    public constructor(private injector: Injector,
                       private formBuilder: FormBuilder) {

    }

    ngAfterViewInit() {
      let controlDefaut = this.formBuilder.control('');
      this.controle = obtenirFormControl(this.injector, controlDefaut);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      return null;
    }

    writeValue(obj: any): void {
      this.entreeTexte = obj;
      this.controle.setValue(obj, {emitEvent: false});
    }

    registerOnChange(fn: any): void {
      this.abonnements.push(this.controle.valueChanges.subscribe(fn));
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    setDisabledState(disabled: boolean): void {
      disabled ? this.controle.disable : this.controle.enable();
    }

    markAsTouched() {
      if (!this.touched) {
        this.onTouched();
        this.touched = true;
      }
    }

    ngOnDestroy() {
      this.abonnements.forEach(a => a && !a.closed && a.unsubscribe());
    }
}
