const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
test('CRUD HTTP de los tres catálogos y reglas de validación', async () => {
  const server = spawn(process.execPath, ['dist/main.js'], { env: { ...process.env, PORT: '3099' }, stdio: 'ignore' });
  const base = 'http://127.0.0.1:3099';
  async function request(method, path, body, expected = 200) {
    const response = await fetch(base + path, { method, headers: {'Content-Type':'application/json'}, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    const result = await response.json();
    assert.equal(response.status, expected, JSON.stringify(result)); return result;
  }
  try {
    let ready = false;
    for (let i=0; i<100; i++) {
      try { await fetch(base); ready=true; break; } catch { await new Promise(r=>setTimeout(r,100)); }
    }
    assert.ok(ready, 'No inició el servidor');
    const medico = {nombres:'Ana',apellidos:'López',fechaNacimiento:'1990-05-15',sexo:'F',carnet:'MED001'};
    await request('POST','/medicos',medico,201);
    await request('POST','/medicos',medico,409);
    await request('PUT','/medicos/MED001',medico);
    await request('PATCH','/medicos/MED001',{nombres:'María'});
    await request('PATCH','/medicos/MED001',{carnet:'OTRO'},400);
    const medicamento = {nombre:'Ejemplo',descripcion:'Tableta',cantidad:10};
    const m = await request('POST','/medicamentos',medicamento,201);
    await request('PUT','/medicamentos/'+m.id,medicamento);
    await request('PATCH','/medicamentos/'+m.id,{cantidad:5});
    await request('PATCH','/medicamentos/'+m.id,{cantidad:null},400);
    await request('PUT','/medicamentos/'+m.id,{cantidad:5},400);
    await request('POST','/medicamentos',{...medicamento,cantidad:-1},400);
    const cita = {fecha:'2026-10-10',hora:'09:30',medico:'MED001',descripcion:'Consulta'};
    await request('POST','/citas',{...cita,medico:'NO'},404);
    const c = await request('POST','/citas',cita,201);
    await request('POST','/citas',cita,409);
    await request('PUT','/citas/'+c.id,{...cita,hora:'10:00'});
    await request('PATCH','/citas/'+c.id,{descripcion:'Control'});
    await request('DELETE','/medicos/MED001',undefined,409);
    await request('PATCH','/citas/'+c.id,{},400);
    await request('POST','/citas',{...cita,hora:'25:00'},400);
    for (const [catalogo,id] of [['medicos','MED001'],['medicamentos',m.id],['citas',c.id]]) {
      assert.equal((await request('GET','/'+catalogo)).length,1);
      assert.equal((await request('GET','/'+catalogo+'/'+id)).id,id);
    }
    const m2 = await request('POST','/medicamentos',medicamento,201);
    await request('DELETE','/medicamentos/'+m.id);
    assert.equal((await request('GET','/medicamentos'))[0].id,m2.id);
    await request('DELETE','/medicamentos/'+m2.id);
    await request('DELETE','/citas/'+c.id);
    await request('DELETE','/medicos/MED001');
    await request('GET','/citas/'+c.id,undefined,404);
  } finally { server.kill(); }
});
