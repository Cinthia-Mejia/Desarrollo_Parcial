import { Module, Controller, Get } from '@nestjs/common';
import { MedicosController } from './medicos/medicos.controller';
import { MedicosService } from './medicos/medicos.service';
import { MedicamentosController } from './medicamentos/medicamentos.controller';
import { MedicamentosService } from './medicamentos/medicamentos.service';
import { CitasController } from './citas/citas.controller';
import { CitasService } from './citas/citas.service';

@Controller()
class AppController {
  @Get() info() { return { nombre: 'API Citas Médicas', catalogos: ['/medicos', '/medicamentos', '/citas'] }; }
}
@Module({
  controllers: [AppController, MedicosController, MedicamentosController, CitasController],
  providers: [MedicosService, MedicamentosService, CitasService],
})
export class AppModule {}
