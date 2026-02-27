// Servicio API para reservas usando Fetch
const API_URL = 'http://localhost:3000/api/v1/reserva';

export async function getReservas(page = 1, limit = 10, estado = '') {
  let url = `${API_URL}/get/all?page=${page}&limit=${limit}`;
  if (estado) url += `&estado=${estado}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener reservas');
  return res.json();
}

export async function getReservaById(id) {
  const res = await fetch(`${API_URL}/get/${id}`);
  if (!res.ok) throw new Error('Error al obtener reserva');
  return res.json();
}

export async function createReserva(data) {
  const res = await fetch(`${API_URL}/post`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al crear reserva');
  return res.json();
}

export async function updateReserva(id, data) {
  const res = await fetch(`${API_URL}/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al actualizar reserva');
  return res.json();
}

export async function deleteReserva(id) {
  const res = await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar reserva');
  return res.json();
}
