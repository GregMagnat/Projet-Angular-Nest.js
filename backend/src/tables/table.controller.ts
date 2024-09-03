import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TableService } from './table.service';
import { Table } from './table.entity';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async getAllTables(): Promise<Table[]> {
    return this.tableService.getAllTables();
  }

  @Get(':id')
  async getTableById(@Param('id') id: number): Promise<Table | null> {
    return this.tableService.getTableById(id);
  }

  @Post()
  async createTable(@Body() tableData: Partial<Table>): Promise<Table> {
    return this.tableService.createTable(tableData);
  }

  @Put(':id')
  async updateTable(
    @Param('id') id: number,
    @Body() tableData: Partial<Table>,
  ): Promise<Table | null> {
    return this.tableService.updateTable(id, tableData);
  }

  @Delete(':id')
  async deleteTable(@Param('id') id: number): Promise<void> {
    return this.tableService.deleteTable(id);
  }
}
