// table.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Table } from './table.entity';
import { TableService } from './table.service';

@Module({
  imports: [TypeOrmModule.forFeature([Table])],
  providers: [TableService],
//   exports: [TableService],
})
export class TableModule {}
