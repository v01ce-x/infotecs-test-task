import { type User } from '@/entities/users';
import { apiFetch } from '@/shared/api';
import { LIMIT_QUERY } from '@/shared/utils';

const skipUser = (totalPage: number) => {
  return totalPage === 0 ? '' : `skip=${totalPage * LIMIT_QUERY}`;
};

export const userService = {
  getAll: (totalPage: number, queryParam: string) => {
    const param = `/search?${queryParam}&${skipUser(totalPage)}`;

    return apiFetch('/users', param);
  },

  getById: (id: number) =>
    apiFetch(`/users/${id}`).then((response: User) => response),
};
