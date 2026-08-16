import { userService } from '../services';

export const getUsers = async (totalPage: number) => {
  if (totalPage === -1) {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }

  try {
    return await userService.users(totalPage);
  } catch {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }
};
