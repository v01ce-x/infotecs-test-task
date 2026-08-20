const baseUrl = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint: string, queryParam: string = '') => {
  return await fetch(`${baseUrl}${endpoint}${queryParam}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка сервера ${res.status}`);
    }
    return res.json();
  });
};
