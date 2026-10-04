import { IsString, Matches, IsDateString, IsIn, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateMedicoDto {
  @IsString() @Matches(/\S/)
  nombres: string;
  @IsString() @Matches(/\S/)
  apellidos: string;
  @IsDateString({ strict: true }) @Matches(/^\d{4}-\d{2}-\d{2}$/)
  fechaNacimiento: string;
  @IsIn(['M', 'F', 'Otro'])
  sexo: string;
  @IsString() @Matches(/\S/)
  carnet: string;
}
export class UpdateMedicoDto extends PartialType(CreateMedicoDto, { skipNullProperties: false }) {}
