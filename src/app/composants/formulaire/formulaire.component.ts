import { Component, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { AdresseForm } from '../adresse/adresse-form';
import { AdresseComponent } from '../adresse/adresse.component';
import { getFormValidationErrors } from '../lib/utils-erreurs';
import { EntreeTexteComponent } from '../commun/entree-texte/entree-texte.component';

@Component({
  selector: 'formulaire',
  standalone: true,
  imports: [CommonModule, FormsModule, AdresseComponent, ReactiveFormsModule, EntreeTexteComponent],
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],

})
export class FormulaireComponent {

  form: FormGroup;
  estAdresseAQuebec = false;
  ngModelAdresse: any;

  get log(): string {
    return `
    nom: ${this.form.controls['nom'].value}
    prenom: ${this.form.controls['prenom'].value}
    adresse: ${JSON.stringify(this.form.controls['adresse'].value)}
    estInvalide: ${!this.form.valid}
    erreurs: ${JSON.stringify(getFormValidationErrors(this.form), null, 2)}`
  };

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      nom: this.fb.control('', []),
      prenom: this.fb.control('', []),
      adresse: this.fb.control(null, [])
    });
  }

  soumettre() {
  }

}
