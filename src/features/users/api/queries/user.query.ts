import { userService } from '../services';
import type { Sort } from '@/features/users';

export const getUsers = async (
  totalPage: number,
  sortingParam: Sort,
  filterParam: string,
) => {
  if (totalPage === -1) {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }
  try {
    const param = new URLSearchParams();
    if (filterParam.trim()) {
      param.append('q', filterParam);
    } else {
      param.delete('q');
    }
    if (sortingParam.key) {
      param.append('sortBy', sortingParam.key);
      param.append('order', sortingParam.value);
    }

    return await userService.users(totalPage, param.toString());
  } catch {
    return {
      users: [],
      limit: 30,
      skip: 0,
      total: 0,
    };
  }
};
