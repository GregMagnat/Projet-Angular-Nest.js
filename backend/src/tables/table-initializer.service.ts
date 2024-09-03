import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TableInitializerService implements OnModuleInit {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async onModuleInit() {
    await this.initializeTables();
  }

  async initializeTables(): Promise<void> {
    const existingTables = await this.tableRepository.find();
    if (existingTables.length === 0) {
      await this.tableRepository.save(TABLES);
    }
  }
}

const TABLES: Partial<Table>[] = [
  { id: 1, number: 1 },
  { id: 2, number: 2 },
  { id: 3, number: 3 },
  { id: 4, number: 4 },
  { id: 5, number: 5 },
  { id: 6, number: 6 },
  { id: 7, number: 7 },
  { id: 8, number: 8 },
  { id: 9, number: 9 },
];
