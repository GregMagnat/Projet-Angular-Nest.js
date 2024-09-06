import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Reservation } from '../reservations/reservation.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(reservation: Reservation) {
    const adminEmail = 'brice@wspirit.fr';
    const userEmail = reservation.email;
    const categories = [
      { id: 1, name: 'Wargames' },
      { id: 2, name: 'Jeux de cartes' },
      { id: 3, name: 'Jeux de sociétés' },
      { id: 4, name: 'Initiation Wargames' },
      { id: 5, name: 'Cours de stratégie' },
    ];

    const category = categories.find(
      (cat) => cat.id === reservation.categoryId,
    );

    const context = {
      lastname: reservation.lastName,
      name: reservation.name,
      date: reservation.date,
      hour_start: reservation.hour_start,
      hour_end: reservation.hour_end,
      category: category ? category.name : 'Catégorie inconnue',
    };

    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirmation de réservation',
      template: './confirmation',
      context,
    });

    await this.mailerService.sendMail({
      to: adminEmail,
      subject: 'Nouvelle réservation reçue',
      template: './admin-notification',
      context: {
        ...context,
        table: reservation.table
          ? `Table ${reservation.table.id}`
          : 'Aucune table assignée',
      },
    });
  }
}
