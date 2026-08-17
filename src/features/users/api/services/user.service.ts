import type { ApiUsersResponse, Sort } from '@/features/users';

const limit = 30;

export const userService = {
  users: (totalPage: number, sorting: Sort) =>
    fetch(
      `${import.meta.env.VITE_API_URL}/users?skip=${totalPage * limit}&sortBy=${sorting.key}&order=${sorting.direction}`,
    ).then<ApiUsersResponse>((res) => res.json()),
};
