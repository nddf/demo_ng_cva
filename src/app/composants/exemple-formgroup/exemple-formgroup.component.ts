import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';
import { getFormValidationErrors } from '../lib/utils-erreurs';

@Component({
  selector: 'app-exemple-formgroup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './exemple-formgroup.component.html',
  styleUrls: ['./exemple-formgroup.component.css']
})
export class ExempleFormgroupComponent {

  public form: FormGroup;
  public compteurModification: number = 0;

  public erreurs(): any {
    return getFormValidationErrors(this.form);
  }

  private baseDonnees: {nom: string, prenom: string}[] = [
    {nom : 'Tremblay', prenom: 'Jean'},
    {nom: 'Gagnon', prenom: 'Linda'}
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      nom: ['', [this.validationLettreEspaceTiret]],
      prenom: '',
    },
    { updateOn: 'blur'});
    this.form.valueChanges.subscribe(() => this.compteurModification++);
  }

  modifierValidationAsync(eventTarget: EventTarget | null) {
    const estCoche = (eventTarget as HTMLInputElement).checked
    if (estCoche) {
      this.form.addAsyncValidators(this.validationNomPrenomExiste);
    } else {
      this.form.removeAsyncValidators(this.validationNomPrenomExiste);
    }
    this.form.updateValueAndValidity();
  }

  validationLettreEspaceTiret(ctrl: AbstractControl): ValidationErrors | null {
    if (!ctrl.value.match(/^[a-zA-Z -]+$/gu)) {
      return {'validationLettreEspaceTiret': true};
    }
    return null;
  }

  validationNomPrenomExiste = (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
    if (this.baseDonnees.find(personne => personne.nom === ctrl.value.nom &&
                                          personne.prenom === ctrl.value.prenom))
    {
      return of(null).pipe(delay(3000));
    }
    return of({'ValidationNomPrenomExiste': true}).pipe(delay(3000));
  }
}
