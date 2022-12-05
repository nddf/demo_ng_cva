import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exemple-template',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exemple-template.component.html',
  styleUrls: ['./exemple-template.component.css'],
})
export class ExempleTemplateComponent {

  public modele = {
    prenom: 'John',
    nom: 'Doe'
  };

}
