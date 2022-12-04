import { AbstractControl, FormControl } from "@angular/forms";

export class ValidationEntreeTexte {

  public static validerEgalite(str: string) {
    return (ctrl: AbstractControl) => {
      if (ctrl.value !== str) {
        const msg = `Le champ doit être égal à ${str}`;
        const retour: any = {};
        retour[msg] = true;
        return retour;
      }
      return null;
    }
  }

}
