"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productos_1 = __importDefault(require("./productos"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Servir archivos estáticos desde /public
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Rutas de la API
app.use('/productos', productos_1.default);
// Página raíz redirige al HTML (opcional si usas index.html como entrada)
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
