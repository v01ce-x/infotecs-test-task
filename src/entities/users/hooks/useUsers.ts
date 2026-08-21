import { useEffect, useState } from 'react';
import {
  type ApiUsersResponse,
  type Sort,
  type User,
  userService,
} from '@/entities/users';
import { LIMIT_QUERY } from '@/shared/utils';

interface Props {
  filter: string;
  sortingParam: Sort;
  inView: boolean;
}

export const useUsers = ({ filter, sortingParam, inView }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const handleUsersLoad = (data: ApiUsersResponse, page: number) => {
    const users = data.users ?? [];

    if (page === 0) {
      setUsers(users);
    } else {
      setUsers((prev) => [...prev, ...users]);
    }

    setHasMore(data.total > LIMIT_QUERY * (page + 1));
  };

  const processingParam = () => {
    const param = new URLSearchParams();

    if (filter.trim()) {
      param.append('q', filter.trim());
    }

    if (sortingParam.key) {
      param.append('sortBy', sortingParam.key);
      param.append('order', sortingParam.value);
    }

    return param.toString();
  };

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setTotalPage((prev) => prev + 1);
    }
  }, [inView, isLoading]);

  useEffect(() => {
    setUsers([]);
    setTotalPage(0);
    setHasMore(true);
    setIsLoading(true);
  }, [filter, sortingParam.key, sortingParam.value]);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);

    userService
      .getAll(totalPage, processingParam())
      .then((data: ApiUsersResponse) => {
        if (cancelled) return;

        handleUsersLoad(data, totalPage);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [totalPage, filter, sortingParam.key, sortingParam.value]);

  return {
    users,
    isLoading,
    totalPage,
    hasMore,
  };
};
