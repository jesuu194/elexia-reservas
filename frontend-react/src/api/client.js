const API_BASE =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:3000/api/v1'
    : 'https://api.elexiareservas.com/api/v1');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message || 'Error en la solicitud';
    throw new Error(message);
  }

  return payload;
}

export const productsApi = {
  list: (page = 1, limit = 10) => request(`/products?page=${page}&limit=${limit}`),
  byId: (id) => request(`/products/${id}`),
  create: (data) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

export const reservasApi = {
  list: (page = 1, limit = 10, estado = '') => {
    const filter = estado ? `&estado=${encodeURIComponent(estado)}` : '';
    return request(`/reserva/get/all?page=${page}&limit=${limit}${filter}`);
  },
  byId: (id) => request(`/reserva/get/${id}`),
  create: (data) => request('/reserva/post', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/reserva/update/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id) => request(`/reserva/delete/${id}`, { method: 'DELETE' }),
};
