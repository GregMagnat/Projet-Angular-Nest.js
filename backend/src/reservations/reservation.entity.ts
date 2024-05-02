import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Category } from '../categorys/category.entity';
import { Table } from '../tables/table.entity';

const NAME_REGEX = /^[A-Za-z\s\-']+$/;
const LAST_NAME_REGEX = /^[A-Za-z\s\-']+$/;
const PHONE_REGEX = /^\+\d{1,3}\s?\d{3,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@ValidatorConstraint({ name: 'customText', async: false })
export class CustomTextValidator implements ValidatorConstraintInterface {
    validate(text: string) {
        return NAME_REGEX.test(text);
    }

    defaultMessage() {
        return 'Mauvais format';
    }
}

@ValidatorConstraint({ name: 'customLastName', async: false })
export class CustomLastNameValidator implements ValidatorConstraintInterface {
    validate(lastName: string) {
        return LAST_NAME_REGEX.test(lastName);
    }

    defaultMessage() {
        return 'Mauvais format';
    }
}

@ValidatorConstraint({ name: 'customPhone', async: false })
export class CustomPhoneValidator implements ValidatorConstraintInterface {
    validate(phone: string) {
        return PHONE_REGEX.test(phone);
    }

    defaultMessage() {
        return 'Numéro de téléphone invalide';
    }
}

@ValidatorConstraint({ name: 'customEmail', async: false })
export class CustomEmailValidator implements ValidatorConstraintInterface {
    validate(email: string) {
        return EMAIL_REGEX.test(email);
    }

    defaultMessage() {
        return 'Email invalide';
    }
}

@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ length: 100, nullable: false })
    @Validate(CustomTextValidator)
    name: string;  

    @Column({ length: 100, nullable: false })
    @Validate(CustomTextValidator)
    lastName: string;

    @Column({ length: 20, nullable: false }) 
    @Validate(CustomPhoneValidator)
    phone: string;

    @Column({ length: 100, nullable: false })
    @Validate(CustomEmailValidator)
    email: string;

    @Column({ type: 'date', nullable: false })
    date: Date;

    @Column({ type: 'time', nullable: false })
    hour_start: string;

    @Column({ type: 'time', nullable: false })
    hour_end: string;

    @Column({ nullable: false })
    
    @ManyToOne(() => Category, category => category.reservations)
    category: Category;

    @ManyToOne(() => Table, table => table.reservations)
    table: Table;
    
}
