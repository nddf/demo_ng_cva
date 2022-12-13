import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EntreeTexteComponent } from './composants/commun/entree-texte/entree-texte.component';
import { FormulaireComponent } from './composants/formulaire/formulaire.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FormulaireComponent,
    EntreeTexteComponent,
    FormsModule
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  entreeTexte: string = '';

}
