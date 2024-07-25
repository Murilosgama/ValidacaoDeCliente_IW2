// controllers/clienteController.js
const mysql = require('mysql');
const dbConfig = require('../config/database');
const connection = mysql.createConnection(dbConfig);

connection.connect();

exports.listarClientes = (req, res) => {
  connection.query('SELECT * FROM clientes', (error, results) => {
    if (error) throw error;
    res.render('cliente-list', { clientes: results });
  });
};

exports.formularioNovoCliente = (req, res) => {
  res.render('cliente-form', { cliente: {} });
};

exports.salvarCliente = (req, res) => {
  const { nome, email, telefone } = req.body;
  connection.query('INSERT INTO clientes SET ?', { nome, email, telefone }, (error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
};

exports.formularioEditarCliente = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM clientes WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.render('cliente-form', { cliente: results[0] });
  });
};

exports.atualizarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  connection.query(
    'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?',
    [nome, email, telefone, id],
    (error, results) => {
      if (error) throw error;
      res.redirect('/');
    }
  );
};

exports.deletarCliente = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM clientes WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.redirect('/');
  });
};
