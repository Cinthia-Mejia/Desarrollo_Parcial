import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { ArrayRepository } from '../common/array.repository';
import { CreateMedicamentoDto } from './medicamentos.dto';
@Injectable()
export class MedicamentosService extends ArrayRepository<CreateMedicamentoDto> {
}
