import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { ArrayRepository } from '../common/array.repository';
import { CreateMedicoDto } from './medicos.dto';
@Injectable()
export class MedicosService extends ArrayRepository<CreateMedicoDto> {
  create(data: CreateMedicoDto) { return super.create(data, data.carnet); }
  replace(id: string, data: CreateMedicoDto) {
    if (data.carnet !== id) throw new BadRequestException('El carnet no se puede cambiar');
    return super.replace(id, data);
  }
}
