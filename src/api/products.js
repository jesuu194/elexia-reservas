// Servicio API para productos usando Fetch
const API_URL = 'http://localhost:3000/api/v1/products';

export async function getProducts(page = 1, limit = 10) {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Error al obtener producto');
  return res.json();
}

export async function createProduct(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear producto');
  return res.json();
}

export async function updateProduct(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar producto');
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar producto');
  return res.json();
}
