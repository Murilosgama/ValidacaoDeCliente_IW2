const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario_mysql',
    password: 'sua_senha_mysql',
    database: 'node_crud'
});

// Conexão com o MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware para o body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Definição do template engine EJS
app.set('view engine', 'ejs');

// Rotas
// Rota principal para exibir todos os clientes
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM clients';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('index', { clients: results });
    });
});

// Rota para exibir o formulário de adição de cliente
app.get('/add', (req, res) => {
    res.render('add');
});

// Rota para adicionar um cliente
app.post('/add', (req, res) => {
    let client = { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address };
    let sql = 'INSERT INTO clients SET ?';
    db.query(sql, client, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Rota para exibir o formulário de edição de cliente
app.get('/edit/:id', (req, res) => {
    let sql = `SELECT * FROM clients WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('edit', { client: result[0] });
    });
});

// Rota para editar um cliente
app.post('/edit/:id', (req, res) => {
    let newName = req.body.name;
    let newEmail = req.body.email;
    let newPhone = req.body.phone;
    let newAddress = req.body.address;
    let sql = `UPDATE clients SET name = '${newName}', email = '${newEmail}', phone = '${newPhone}', address = '${newAddress}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Rota para deletar um cliente
app.get('/delete/:id', (req, res) => {
    let sql = `DELETE FROM clients WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
