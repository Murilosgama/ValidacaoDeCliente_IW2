// app.js
const express = require('express');
const bodyParser = require('body-parser');
const clienteController = require('./controllers/clienteController');

const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do EJS como template engine
app.set('view engine', 'ejs');

// Rotas
app.get('/', clienteController.listarClientes);
app.get('/clientes/novo', clienteController.formularioNovoCliente);
app.post('/clientes/novo', clienteController.salvarCliente);
app.get('/clientes/editar/:id', clienteController.formularioEditarCliente);
app.post('/clientes/editar/:id', clienteController.atualizarCliente);
app.get('/clientes/deletar/:id', clienteController.deletarCliente);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
