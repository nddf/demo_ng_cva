import { Component } from '@angular/core';
import { FormulaireComponent } from './composants/formulaire/formulaire.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FormulaireComponent
  ]
})
export class AppComponent {



}
