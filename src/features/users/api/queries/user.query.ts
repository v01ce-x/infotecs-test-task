import { userService } from '../services';
import type { Sort } from '@/features/users';

export const getUsers = async (totalPage: number, sorting: Sort) => {
  if (totalPage === -1) {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }

  try {
    return await userService.users(totalPage, sorting);
  } catch {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }
};
