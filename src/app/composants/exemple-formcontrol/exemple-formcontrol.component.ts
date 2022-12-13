import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Component({
  selector: 'app-exemple-formcontrol',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './exemple-formcontrol.component.html',
  styleUrls: ['./exemple-formcontrol.component.css']
})
export class ExempleFormcontrolComponent {

  public formCtrl: FormControl = this.fb.control('Valeur initiale', {nonNullable: true, updateOn: 'change'});
  public compteurModification: number = 0

  constructor(private fb: FormBuilder) {
    this.formCtrl.valueChanges.subscribe(() => this.compteurModification++);
  }

  modifierValidationSync(eventTarget: EventTarget | null) {
    const estCoche = (eventTarget as HTMLInputElement).checked
    if (estCoche) {
      this.formCtrl.addValidators(this.validationSync);
    } else {
      this.formCtrl.removeValidators(this.validationSync);
    }
    this.formCtrl.updateValueAndValidity();
  }

  validationSync(ctrl: AbstractControl): ValidationErrors | null {
    if (ctrl.value !== 'World') {
      return {DifferentDeWorld: true};
    }
    return null;
  }

  modifierValidationAsync(eventTarget: EventTarget | null) {
    const estCoche = (eventTarget as HTMLInputElement).checked
    if (estCoche) {
      this.formCtrl.addAsyncValidators(this.validationAsync);
    } else {
      this.formCtrl.removeAsyncValidators(this.validationAsync);
    }
    this.formCtrl.updateValueAndValidity();
  }

  validationAsync(ctrl: AbstractControl): Observable<ValidationErrors | null> {
    if (ctrl.value !== 'People') {
      return of({DifferentDePeople: true}).pipe(delay(3000));
    }
    return of(null).pipe(delay(3000));
  }

}
