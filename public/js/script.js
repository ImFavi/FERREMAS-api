const API = '/productos';

function cargarProductos() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById('tabla-productos');
      tabla.innerHTML = '';
      data.forEach(p => {
        tabla.innerHTML += `
          <tr>
            <td>${p.id}</td>
            <td><input value="${p.nombre}" id="nombre-${p.id}"/></td>
            <td><input value="${p.precio}" type="number" id="precio-${p.id}"/></td>
            <td><input value="${p.stock}" type="number" id="stock-${p.id}"/></td>
            <td>
              <button onclick="actualizarProducto(${p.id})">Actualizar</button>
              <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
          </tr>`;
      });
    });
}

function agregarProducto() {
  const nombre = document.getElementById('nombre').value.trim();
  const precioStr = document.getElementById('precio').value;
  const stockStr = document.getElementById('stock').value;
  const mensaje = document.getElementById('mensaje');
  mensaje.textContent = '';

  if (!nombre) {
    mensaje.textContent = 'El nombre es obligatorio.';
    return;
  }

  const precio = parseFloat(precioStr);
  if (isNaN(precio) || precio <= 0) {
    mensaje.textContent = 'El precio debe ser un número mayor a 0.';
    return;
  }

  const stock = parseInt(stockStr);
  if (isNaN(stock) || stock < 0) {
    mensaje.textContent = 'El stock debe ser un número igual o mayor a 0.';
    return;
  }

  fetch('/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio, stock })
  })
    .then(async res => {
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.mensaje || 'Error al agregar producto');
      }
      return res.json();
    })
    .then(() => {
      document.getElementById('nombre').value = '';
      document.getElementById('precio').value = '';
      document.getElementById('stock').value = '';
      cargarProductos();
    })
    .catch(err => {
      mensaje.textContent = err.message;
    });
}


function actualizarProducto(id) {
  const nombre = document.getElementById(`nombre-${id}`).value;
  const precio = parseFloat(document.getElementById(`precio-${id}`).value);
  const stock = parseInt(document.getElementById(`stock-${id}`).value);

  fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio, stock })
  }).then(() => cargarProductos());
}

function eliminarProducto(id) {
  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(() => cargarProductos());
}

cargarProductos();
