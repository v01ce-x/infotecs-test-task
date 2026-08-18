import { LIMIT_QUERY } from '@/features/users';
import { apiFetch } from '@/shared/api';

const skipUser = (totalPage: number) => {
  return totalPage === 0 ? '' : `skip=${totalPage * LIMIT_QUERY}`;
};

export const userService = {
  users: (totalPage: number, queryParam: string) =>
    apiFetch('/users', skipUser(totalPage), queryParam),
};
