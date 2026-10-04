import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
/** Almacenamiento temporal: sin base de datos. */
export class ArrayRepository<T extends object> {
  protected records: (T & { id: string })[] = [];
  private nextId = 1;
  list() { return this.records; }
  get(id: string) {
    const record = this.records.find(item => item.id === id);
    if (!record) throw new NotFoundException('Registro no encontrado');
    return record;
  }
  create(data: T, id?: string) {
    const key = id ?? String(this.nextId++);
    if (this.records.some(item => item.id === key)) throw new ConflictException('Identificador duplicado');
    const record = { ...data, id: key };
    this.records.push(record);
    return record;
  }
  replace(id: string, data: T) {
    this.get(id);
    const index = this.records.findIndex(item => item.id === id);
    this.records[index] = { ...data, id };
    return this.records[index];
  }
  patch(id: string, data: Partial<T>) {
    if (Object.keys(data).length === 0) throw new BadRequestException('Envía al menos un campo');
    return this.replace(id, { ...this.get(id), ...data });
  }
  remove(id: string) {
    const record = this.get(id);
    const index = this.records.findIndex(item => item.id === id);
    // pop elimina el último; splice elimina un elemento en otra posición.
    if (index === this.records.length - 1) this.records.pop();
    else this.records.splice(index, 1);
    return { mensaje: 'Registro eliminado', registro: record };
  }
}
