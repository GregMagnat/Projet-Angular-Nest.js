import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
    <div class="about-container">
      <div class="about-content">
        <div class="about-text">
          <div class="inline-content">
            <p>
              <strong> Wargame Spirit, </strong>
              un lieu incontournable pour les passionnés de jeux de figurines,
              sociétés.
            </p>
          </div>
          <p>
            Située au coeur de Grenoble, notre boutique est accessible en
            voiture, en tramway et même en train. Voici un guide pour vous aider
            à nous rejoindre.
          </p>
          <p class="title"><strong>Adresse</strong></p>
          <p>
            21 boulevard Gambetta<br />
            38 000 Grenoble
          </p>
          <div class="inline-content">
            <p>
              <strong>En tramway, </strong>deux lignes s'arrêtent à proximité :
            </p>
          </div>

          <ul class="square-decorated-list">
            <li>
              Ligne A : Descendez à l'arrêt Gambetta, marchez environ 3 minutes
              en direction du nord sur le Boulevard Gambetta.
            </li>
            <br />
            <li>
              Ligne B : Descendez à l'arrêt "Grenette", marchez environ 5
              minutes en direction du sud sur le Boulevard Gambetta.
            </li>
          </ul>
          <div class="inline-content">
            <p>
              <strong>En train ou en voiture, </strong>
              la boutique restera facile d'accès, à 10min à pied de la gare de
              Grenoble et des places payantes pour les voitures sont disponibles
              tout autour de la boutique.
            </p>
          </div>
        </div>

        <div class="about-map">
          <img
            src="../../../WGS-map.png"
            alt="Map to Wargame Spirit"
            class="map"
          />
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {}
