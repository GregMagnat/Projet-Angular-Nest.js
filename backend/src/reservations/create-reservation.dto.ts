import { IsString, IsEmail, IsDate, IsNotEmpty } from 'class-validator';
import { IsPhoneNumber } from 'class-validator';
import { Category } from '../categorys/category.entity';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  hour_start: string;

  @IsString()
  @IsNotEmpty()
  hour_end: string;

  @IsNotEmpty()
  category: Category;
  
}
