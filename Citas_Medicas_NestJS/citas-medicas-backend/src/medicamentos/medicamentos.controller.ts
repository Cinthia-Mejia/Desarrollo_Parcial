import { Body, Controller, Get, Post, Put, Patch, Delete, Param, ConflictException } from '@nestjs/common';
import { MedicamentosService } from './medicamentos.service';
import { CreateMedicamentoDto, UpdateMedicamentoDto } from './medicamentos.dto';
@Controller('medicamentos')
export class MedicamentosController {
  constructor(private readonly service: MedicamentosService) {}
  @Get() list() { return this.service.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.service.get(id); }
  @Post() create(@Body() dto: CreateMedicamentoDto) { return this.service.create(dto); }
  @Put(':id') replace(@Param('id') id: string, @Body() dto: CreateMedicamentoDto) { return this.service.replace(id, dto); }
  @Patch(':id') patch(@Param('id') id: string, @Body() dto: UpdateMedicamentoDto) { return this.service.patch(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
