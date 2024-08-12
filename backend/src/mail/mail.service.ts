import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Reservation } from '../reservations/reservation.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(reservation: Reservation) {
    const adminEmail = 'admin@example.com';
    const userEmail = reservation.email;

    const context = {
      name: reservation.name,
      date: reservation.date,
      hour_start: reservation.hour_start,
      hour_end: reservation.hour_end,
      category: reservation.category.name,
    };

    // Envoi de l'email au client
    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Confirmation de réservation',
      template: './confirmation',
      context,
    });

    // Envoi de l'email à l'admin
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
