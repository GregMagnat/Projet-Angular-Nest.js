import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TableService } from './table.service';
import { TableInitializerService } from './table-initializer.service';
import { TableController } from './table.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [TableService, TableInitializerService],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {}
