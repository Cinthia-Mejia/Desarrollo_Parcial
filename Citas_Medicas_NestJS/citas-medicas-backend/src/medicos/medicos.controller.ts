import { Body, Controller, Get, Post, Put, Patch, Delete, Param, ConflictException } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto, UpdateMedicoDto } from './medicos.dto';
import { CitasService } from '../citas/citas.service';
@Controller('medicos')
export class MedicosController {
  constructor(private readonly service: MedicosService, private readonly citas: CitasService) {}
  @Get() list() { return this.service.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.service.get(id); }
  @Post() create(@Body() dto: CreateMedicoDto) { return this.service.create(dto); }
  @Put(':id') replace(@Param('id') id: string, @Body() dto: CreateMedicoDto) { return this.service.replace(id, dto); }
  @Patch(':id') patch(@Param('id') id: string, @Body() dto: UpdateMedicoDto) { return this.service.patch(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) {
    if (this.citas.hasMedico(id)) throw new ConflictException('Elimina primero las citas de este médico');
    return this.service.remove(id);
  }
}
