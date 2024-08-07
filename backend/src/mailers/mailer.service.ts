import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReservationConfirmation(email: string, reservationDetails: any) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirmation de Réservation',
      template: './reservation-confirmation', // Le nom du fichier template (sans extension)
      context: {
        name: reservationDetails.name,
        lastName: reservationDetails.lastName,
        phone: reservationDetails.phone,
        email: reservationDetails.email,
        date: reservationDetails.date,
        hour_start: reservationDetails.hour_start,
        hour_end: reservationDetails.hour_end,
        category: reservationDetails.category,
      },
      bcc: 'your_admin_email@example.com', // Remplacez par votre email de réception
    });
  }
}
