import { Component, ElementRef, forwardRef, Injector, Input, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { obtenirFormControl } from '../../lib/injection-control';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

@Component({
  selector: 'entree-texte[formControlName], entree-texte[formControl], entree-texte[ngModel]',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, EntreeTexteComponent, NgxMaskModule],
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
    }
  ]
})
export class EntreeTexteComponent implements ControlValueAccessor, Validator, OnDestroy {
    @Input()libelle: string = '';
    @Input()masque = '';

    @ViewChild('entree') entree!: ElementRef;

    private abonnements: Subscription[] = [];
    public onTouched = () => {};
    public onChanged = (val: any) => {};
    isDisabled: boolean = false;
    valeur: string | null = null;

    public constructor() { }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
      return null;
    }

    writeValue(obj: any): void {
      this.valeur = obj;
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

    ngOnDestroy() {
      this.abonnements.forEach(a => a && !a.closed && a.unsubscribe());
    }

    surChangement(event: Event) {
      this.valeur = (event.target as HTMLInputElement).value
      this.onChanged(this.valeur);
    }
}
