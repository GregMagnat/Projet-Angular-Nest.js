import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div class="reservation-main">
      <div class="reservation-content">
        <h3 class="titleWS">Chez Wargame Spirit</h3>
        <p>
          Nous sommes heureux de vous proposer la possibilité de réserver une
          table de jeu pour vos parties de <br />
          Warhammer, Magic et jeux de société préférés. Avec un ensemble de 8
          tables disponibles tout au long <br />
          de la semaine, ainsi que certains soirs pendant nos horaires
          d’ouverture, vous êtes assurés de trouver <br />un créneau qui vous
          convient.
        </p>
        <p>
          Notre équipe dévouée est prête à vous accueillir pour vos parties les
          plus endiablées. Une fois votre réservation <br />effectuée en ligne,
          il vous suffira de vous présenter à la caisse pour vous présenter.
          Nous vous demanderons <br />simplement de vous acquitter d’une boisson
          par joueur pour avoir accès à votre table de jeu réservée.
        </p>
        <p>
          Pour réserver votre table, rien de plus simple : rendez-vous ici,
          choisissez le créneau qui vous convient <br />le mieux et suivez les
          instructions pour finaliser votre réservation. Une fois sur place,
          notre équipe sera ravie <br />de vous accueillir et de vous aider à
          profiter au maximum de votre expérience de jeu chez Wargame Spirit.
        </p>
        <p>
          Nous sommes impatients de vous voir en boutique et de partager avec
          vous notre passion pour les jeux <br />de figurines, Magic et jeux de
          société. À bientôt chez Wargame Spirit !
        </p>
        <div class="button-container">
          <button
            mat-button
            class="left-button"
            (click)="openReservationModal()"
          >
            Réserver une table
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  constructor(public dialog: MatDialog) {}

  openReservationModal(): void {
    this.dialog.open(ReservationModalComponent, {
      width: '300px',
      backdropClass: 'custom-backdrop',
    });
  }
}
