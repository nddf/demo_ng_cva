import { AfterViewInit, Component, ElementRef, forwardRef, Injector, Input, OnInit, Self, ViewChild } from '@angular/core';
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
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, EntreeTexteComponent],
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

    @Input()libelle: string = '';

    private abonnements: Subscription[] = [];
    public onTouched = () => {};
    isDisabled: boolean = false;

    controle: FormControl = this.formBuilder.control('');

    public constructor(private injector: Injector,
                       private formBuilder: FormBuilder) {

    }

    ngAfterViewInit() {
      this.controle = obtenirFormControl(this.injector, this.controle);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      return null;
    }

    writeValue(obj: any): void {
      obj && this.controle.setValue(obj, {emitEvent: false});
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

    ngOnDestroy() {
      this.abonnements.forEach(a => a && !a.closed && a.unsubscribe());
    }
}
