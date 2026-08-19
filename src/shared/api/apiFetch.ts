const baseUrl = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint: string, queryParam: string = '') => {
  try {
    return await fetch(`${baseUrl}${endpoint}${queryParam}`).then((res) =>
      res.json(),
    );
  } catch (error) {
    console.log(error);
  }
};
