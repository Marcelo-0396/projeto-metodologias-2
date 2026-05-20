const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            senha TEXT
        )`);

        db.run(`INSERT OR IGNORE INTO clientes (email, senha) VALUES ('cliente@teste.com', '123456')`);
    }
});

app.post('/api/login', (req, res) => {
    const emailUsuario = req.body.email;
    const senhaUsuario = req.body.senha;

    const sql = `SELECT * FROM clientes WHERE email = ? AND senha = ?`;
    
    db.get(sql, [emailUsuario, senhaUsuario], (err, row) => {
        if (err) {
            return res.status(500).json({ mensagem: 'Erro no servidor' });
        }
        
        if (row) {
            res.status(200).json({ sucesso: true, mensagem: 'Login aprovado!' });
        } else {
            res.status(401).json({ sucesso: false, mensagem: 'E-mail ou senha incorretos.' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});