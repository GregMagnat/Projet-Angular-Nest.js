import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
  
    <div class="about-container">
      <img src="../../../Logo.webp" alt="Wargame Spirit Logo" class="logo">
      <div class="about-content">
        <div class="about-text">
          <h2>Wargame Spirit,</h2>
          <p>
            un lieu incontournable pour les passionnés de jeux de figurines, sociétés.
            Située au coeur de Grenoble, notre boutique est accessible en voiture, en tramway et même en train.
            Voici un guide pour vous aider à nous rejoindre.
          </p>
          <h3>Adresse</h3>
          <p>
            21 boulevard Gambetta<br>
            38 000 Grenoble
          </p>
          <h3>En tramway,</h3>
          <p>deux lignes s'arrêtent à proximité :</p>
          <ul>
            <li>Ligne A : Descendez à l'arrêt Gambetta, marchez environ 3 minutes en direction du nord sur le Boulevard Gambetta.</li>
            <li>Ligne B : Descendez à l'arrêt "Grenette", marchez environ 5 minutes en direction du sud sur le Boulevard Gambetta.</li>
          </ul>
          <h3>En train ou en voiture,</h3>
          <p>
            la boutique restera facile d'accès, à 10min à pied de la gare de Grenoble et des places payantes pour les voitures sont disponibles tout autour de la boutique.
          </p>
        </div>
        <div class="about-map">
          <img src="assets/map.png" alt="Map to Wargame Spirit" class="map">
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./about.component.css']
})
export class AboutComponent {}
