import { IsString, Matches, IsDateString, IsIn, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateCitaDto {
  @IsDateString({ strict: true }) @Matches(/^\d{4}-\d{2}-\d{2}$/)
  fecha: string;
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/)
  hora: string;
  @IsString() @Matches(/\S/)
  medico: string;
  @IsString() @Matches(/\S/)
  descripcion: string;
}
export class UpdateCitaDto extends PartialType(CreateCitaDto, { skipNullProperties: false }) {}
