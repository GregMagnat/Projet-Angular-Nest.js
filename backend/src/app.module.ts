import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservations/reservation.entity';
import { Category } from './categorys/category.entity';
import { Table } from './tables/table.entity';
import { ReservationModule } from './reservations/reservation.module';
import { CategoryModule } from './categorys/category.module';
import { TableModule } from './tables/table.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'myuser',
      password: 'mypassword',
      database: 'mydb',
      entities: [Reservation, Category, Table],
      synchronize: true,
      migrations: ['./migrations/*{.ts,.js}'],
    }),
    ReservationModule,
    CategoryModule,
    TableModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
