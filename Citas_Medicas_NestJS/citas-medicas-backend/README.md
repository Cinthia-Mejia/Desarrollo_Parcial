# Backend de citas médicas

Proyecto académico NestJS con médicos, medicamentos y citas. Solo backend.

## Ejecutar en Windows / VS Code
1. Instala Node.js 22 LTS (incluye npm).
2. Extrae el ZIP y abre la carpeta `citas-medicas-backend` en VS Code.
3. Abre Terminal > Nueva terminal y ejecuta:

```bash
npm install
npm run start:dev
```

Abre http://localhost:3000 para ver la información de la API. Mantén la terminal abierta.
No necesitas instalar Nest CLI, configurar .env ni crear una base de datos.

Para compilar y ejecutar:
```bash
npm run build
npm start
```

## Almacenamiento
Los registros se guardan en arreglos en memoria y se pierden al reiniciar el backend.
Se utilizan push, find, some, findIndex, pop y splice.
Médicos: el carnet es el identificador (también se devuelve como id); no puede cambiarse.
Medicamentos y citas: id numérico secuencial representado como texto y generado automáticamente.
El campo medico de una cita contiene el carnet de un médico existente.

## Rutas (para cada catálogo)
Reemplaza `catalogo` por `medicos`, `medicamentos` o `citas`.

| Método | Ruta | Acción |
|---|---|---|
| POST | /catalogo | Crear registro |
| GET | /catalogo | Consultar todos |
| GET | /catalogo/:id | Consultar uno |
| PUT | /catalogo/:id | Reemplazar: todos los campos obligatorios |
| PATCH | /catalogo/:id | Actualizar: uno o más campos |
| DELETE | /catalogo/:id | Eliminar |

POST responde 201; los demás métodos, 200. Datos inválidos: 400; registro inexistente: 404;
carnet duplicado, choque de horario o médico con citas: 409.
No envíes id en el cuerpo. Cantidad debe ser entero no negativo, sexo M/F/Otro,
fechas YYYY-MM-DD y hora HH:mm (24 horas). PATCH no acepta null ni un cuerpo vacío.

## Probar en Postman
Importa `postman/Citas-Medicas.postman_collection.json`.
Primero crea un médico y después una cita con su carnet. Los ejemplos de cada ruta
son independientes: no ejecutes toda la colección como una secuencia, porque borrar
un médico antes de crear su cita genera un error. Elimina las citas antes de eliminar
su médico. Usa Body > raw > JSON en las solicitudes POST, PUT y PATCH.

### POST /medicos
```json
{"nombres":"Ana","apellidos":"López","fechaNacimiento":"1990-05-15","sexo":"F","carnet":"MED001"}
```
### POST /medicamentos
```json
{"nombre":"Paracetamol","descripcion":"Tabletas de 500 mg","cantidad":50}
```
### POST /citas
```json
{"fecha":"2026-10-10","hora":"09:30","medico":"MED001","descripcion":"Consulta general"}
```
### PATCH /medicamentos/1
```json
{"cantidad":20}
```

## Estructura
- src/main.ts: inicio y validación global.
- src/app.module.ts: registro de controladores y servicios.
- src/common/array.repository.ts: operaciones compartidas sobre arreglos.
- src/medicos, src/medicamentos, src/citas: DTO, controlador y servicio por catálogo.
- test/api.test.cjs: prueba HTTP de CRUD, validación y relaciones. Ejecuta `npm test`.

Esta API académica no incorpora autenticación ni persistencia.
