import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsEmail, IsDate, IsNotEmpty } from 'class-validator';
import { Category } from '../categorys/category.entity';
import { Table } from '../tables/table.entity';

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ length: 100, nullable: false })
    @IsString()
    @IsNotEmpty()
    name: string;  

    @Column({ length: 100, nullable: false })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Column({ length: 20, nullable: false }) 
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Column({ length: 100, nullable: false })
    @IsEmail({}, { message: 'Email invalide' })
    email: string;

    @Column({ type: 'date', nullable: false })
    @IsDate()
    @IsNotEmpty()
    date: Date;

    @Column({ type: 'time', nullable: false })
    @IsString()
    @IsNotEmpty()
    hour_start: string;

    @Column({ type: 'time', nullable: false })
    @IsString()
    @IsNotEmpty()
    hour_end: string;

    @Column({ nullable: false })
    categoryId: number;

    @ManyToOne(() => Category, category => category.reservations)
    category: Category;

    @ManyToOne(() => Table, table => table.reservations)
    table: Table;
}
