import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Reservation } from '../reservations/reservation.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(reservation: Reservation, token: string) {
    // Créez l'URL de confirmation selon votre logique
    const url = `https://example.com/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: reservation.email,
      subject: 'Confirmation de réservation',
      template: './confirmation',
      context: {
        name: reservation.name,
        date: reservation.date,
        hour_start: reservation.hour_start,
        hour_end: reservation.hour_end,
        token,
        url, // Assurez-vous que la variable 'url' est définie et incluse dans le contexte
      },
    });
  }
}
