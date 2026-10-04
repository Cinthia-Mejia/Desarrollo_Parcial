import { IsString, Matches, IsDateString, IsIn, IsInt, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateMedicamentoDto {
  @IsString() @Matches(/\S/)
  nombre: string;
  @IsString() @Matches(/\S/)
  descripcion: string;
  @IsInt() @Min(0)
  cantidad: number;
}
export class UpdateMedicamentoDto extends PartialType(CreateMedicamentoDto, { skipNullProperties: false }) {}
