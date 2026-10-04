import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { ArrayRepository } from '../common/array.repository';
import { CreateCitaDto } from './citas.dto';
import { MedicosService } from '../medicos/medicos.service';
@Injectable()
export class CitasService extends ArrayRepository<CreateCitaDto> {
  constructor(private readonly medicos: MedicosService) { super(); }
  private check(data: CreateCitaDto, id?: string) {
    this.medicos.get(data.medico);
    if (this.records.some(item => item.id !== id && item.medico === data.medico && item.fecha === data.fecha && item.hora === data.hora)) {
      throw new ConflictException('El médico ya tiene una cita en esa fecha y hora');
    }
  }
  create(data: CreateCitaDto) { this.check(data); return super.create(data); }
  replace(id: string, data: CreateCitaDto) { this.get(id); this.check(data, id); return super.replace(id, data); }
  hasMedico(carnet: string) { return this.records.some(item => item.medico === carnet); }
}
