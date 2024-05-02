// table.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async getAllTables(): Promise<Table[]> {
    return await this.tableRepository.find();
  }

  async getTableById(id: number): Promise<Table | null> {
    return await this.tableRepository.findOne({ where: { id } });
  }

  async createTable(tableData: Partial<Table>): Promise<Table> {
    const newTable = this.tableRepository.create(tableData);
    return await this.tableRepository.save(newTable);
  }

  async updateTable(id: number, tableData: Partial<Table>): Promise<Table | null> {
    await this.tableRepository.update(id, tableData);
    return await this.tableRepository.findOne({ where: { id } });
  }

  async deleteTable(id: number): Promise<void> {
    await this.tableRepository.delete(id);
  }
}
