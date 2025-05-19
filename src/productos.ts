import express from 'express';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

const router = express.Router();
let productos: Producto[] = [];
let idCounter = 1;

// GET
router.get('/', (req, res) => {
  res.json(productos);
});

// GET ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.json(producto);
});

// POST
router.post('/', (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;

  // Validar nombre duplicado
  const nombreExistente = productos.some(p => p.nombre.toLowerCase().trim() === nombre.toLowerCase().trim());
  if (nombreExistente) {
    return res.status(400).json({ mensaje: 'Ya existe un producto con ese nombre.' });
  }

  const nuevoProducto: Producto = {
    id: idCounter++,
    nombre,
    precio,
    stock,
    categoria: categoria || ''
  };

  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  const { nombre, precio, stock, categoria } = req.body;
  if (nombre !== undefined) producto.nombre = nombre;
  if (precio !== undefined) producto.precio = precio;
  if (stock !== undefined) producto.stock = stock;
  if (categoria !== undefined) producto.categoria = categoria;

  res.json(producto);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  productos.splice(index, 1);
  res.json({ mensaje: 'Producto eliminado' });
});

export default router;
