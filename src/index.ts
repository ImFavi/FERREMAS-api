import express, { Request, Response } from 'express';
import productosRouter from './productos';
import path from 'path';

const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Servir archivos estáticos desde /public
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/productos', productosRouter);

// Página raíz redirige al HTML (opcional si usas index.html como entrada)
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
