import { FormControl, FormGroup, Validators } from "@angular/forms";

export class AdresseForm extends FormGroup {

  constructor() {
    super({
        porte: new FormControl<number | null>(null, []),
        numeroCivique: new FormControl<string | null>(null, [Validators.pattern('[0-9]+[a-zA-Z]?')]),
        rue: new FormControl<string|null>('', []),
        codePostal: new FormControl<string|null>('', []),
        ville: new FormControl<string|null>('', [])
      });
  }
}
