import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.example.com', // Remplacez par votre serveur SMTP
        port: 587,
        secure: false, // true pour 465, false pour les autres ports
        auth: {
          user: 'your_email@example.com', // Remplacez par votre email
          pass: 'your_email_password', // Remplacez par votre mot de passe
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>', // Remplacez par votre email par défaut
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // ou une autre bibliothèque de template
        options: {
          strict: true,
        },
      },
    }),
  ],
  exports: [MailerModule],
})
export class MailerConfigModule {}
