import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TableService } from './table.service';
import { TableInitializerService } from './table-initializer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [TableService, TableInitializerService],
  exports: [TableService],
})
export class TableModule {}
