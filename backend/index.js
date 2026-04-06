const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

const client = new Client({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'testdb',
  port: 5432
});

client.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error conexión DB', err));

app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

app.get('/db', async (req, res) => {
  const result = await client.query('SELECT NOW()');
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});