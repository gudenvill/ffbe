const express = require('express');
const path = require('path');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/admin/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products').all();
    res.render('admin/products/index', { products });
});

app.get('/admin/products/new', (req, res) => {
    res.render('admin/products/new');
});

app.post('/admin/products', (req, res) => {
    const { name, sku, price } = req.body;
    db.prepare('INSERT INTO products (name, sku, price) VALUES (?, ?, ?)').run(name, sku, price);
    res.redirect('/admin/products');
});

// API routes
app.get('/api/products', (req, res) => {
    const name = req.query.name || '';
    const products = db.prepare('SELECT * FROM products WHERE name LIKE ?').all(`%${name}%`);
    res.json(products);
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="sv">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>FFBE</title>
        </head>
        <body>
            <h1>Välkommen till FFBE</h1>
            <p>Servern körs!</p>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server körs på http://localhost:${PORT}`);
});
