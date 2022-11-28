import { FormArray, FormGroup, Validators } from "@angular/forms"

export class FormulaireForm extends FormGroup {
  constructor(private id: string) {
    super({
      'votant': ['', Validators.required],
      'france': [false, []],
      'allemagne': [false, []],
      'bresil': [false, []]
    });
  }
}
