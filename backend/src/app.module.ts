import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservations/reservation.entity';
import { Category } from './categorys/category.entity'; 
import { Table } from './tables/table.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'myuser', 
      password: 'mypassword',
      database: 'mydb', 
      entities: [Reservation, Category, Table], 
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
