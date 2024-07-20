import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule],
  template: `

  <div class="reservation">
    <h1 class="titleWS"> Chez Wargame Spirit,</h1>
    <p>Nous sommes heureux de vous proposer la possibilité de réserver une table de jeu pour vos parties de <br> Warhammer, Magic et jeux de société préférés. Avec un ensemble de 8 tables disponibles tout au long <br> de la semaine, ainsi que certains soirs pendant nos horaires d’ouverture, vous êtes assurés de trouver <br>un créneau qui vous convient. </p>
    <p>Notre équipe dévouée est prête à vous accueillir pour vos parties les plus endiablées. Une fois votre réservation <br>effectuée en ligne, il vous suffira de vous présenter à la caisse pour vous présenter. Nous vous demanderons <br>simplement de vous acquitter d’une boisson par joueur pour avoir accès à votre table de jeu réservée. </p>
    <p>Pour réserver votre table, rien de plus simple : rendez-vous ici, choisissez le créneau qui vous convient <br>le mieux et suivez les instructions pour finaliser votre réservation. Une fois sur place, notre équipe sera ravie <br>de vous accueillir et de vous aider à profiter au maximum de votre expérience de jeu chez Wargame Spirit.</p>
    <p>Nous sommes impatients de vous voir en boutique et de partager avec vous notre passion pour les jeux <br>de figurines, Magic et jeux de société. À bientôt chez Wargame Spirit !</p>
    <a href="/reservation" target="_blank">
        <button href="/reservation" mat-flat-button color="warn">
          Réserver une table
        </button>
      </a> 
  </div>
  `,
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {}