import { Body, Controller, Get, Post, Put, Patch, Delete, Param, ConflictException } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CreateCitaDto, UpdateCitaDto } from './citas.dto';
@Controller('citas')
export class CitasController {
  constructor(private readonly service: CitasService) {}
  @Get() list() { return this.service.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.service.get(id); }
  @Post() create(@Body() dto: CreateCitaDto) { return this.service.create(dto); }
  @Put(':id') replace(@Param('id') id: string, @Body() dto: CreateCitaDto) { return this.service.replace(id, dto); }
  @Patch(':id') patch(@Param('id') id: string, @Body() dto: UpdateCitaDto) { return this.service.patch(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
