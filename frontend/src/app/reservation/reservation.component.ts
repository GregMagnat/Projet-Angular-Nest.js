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
          Nous sommes heureux de vous proposer <strong>la possibilité de réserver une
          table de jeu</strong> pour vos parties de Warhammer, Magic et jeux de société
          préférés. Avec un ensemble de <strong>8 tables disponibles</strong> tout au long de la
          semaine, ainsi que certains soirs pendant nos horaires d’ouverture,
          vous êtes assurés de trouver un créneau qui vous convient.
        </p>
        <p>
          Notre équipe dévouée est prête à vous accueillir pour vos parties les
          plus endiablées. Une fois votre réservation effectuée en ligne, il
          vous suffira de vous <strong>présenter à la caisse</strong> pour vous présenter. Nous
          vous demanderons simplement de vous acquitter <strong>d’une boisson par joueur</strong>
          pour avoir accès à votre table de jeu réservée.
        </p>
        <p>
          Pour réserver votre table, rien de plus simple : rendez-vous <strong>ici</strong>,
          choisissez le créneau qui vous convient le mieux et suivez les
          instructions pour finaliser votre réservation. Une fois sur place,
          notre équipe sera ravie de vous accueillir et de vous aider à profiter
          au maximum de votre expérience de jeu chez Wargame Spirit.
        </p>
        <p>
          Nous sommes impatients de vous voir en boutique et de partager avec
          vous notre passion pour les jeux de figurines, Magic et jeux de
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
