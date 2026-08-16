import type { ApiUsersResponse } from '@/features/users';

const limit = 30;

export const userService = {
  users: (totalPage: number) =>
    fetch(
      `${import.meta.env.VITE_API_URL}/users?skip=${totalPage * limit}`,
    ).then<ApiUsersResponse>((res) => res.json()),
};
