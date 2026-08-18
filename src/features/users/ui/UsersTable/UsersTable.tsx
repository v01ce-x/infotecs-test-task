import { useEffect, useState } from 'react';
import {
  type ApiUsersResponse,
  getUsers,
  LIMIT_QUERY,
  type Sort,
  TABLE_HEADERS,
  type User,
} from '@/features/users';
import styles from './UsersTable.module.css';
import { FieldInput, TitleTable, UserCell } from '@/shared/ui';
import Skeleton from '@/shared/ui/Skeleton/Skeleton.tsx';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from '@/shared/hooks';

const UsersTable = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [totalPage, setTotalPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [sortingParam, setSortingParam] = useState<Sort>({
    key: '',
    value: 'none',
  });

  const [filterParam, setFilterParam] = useState('');

  const debounceFilter = useDebounce(filterParam, 500);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const handleUsersLoad = (data: ApiUsersResponse, page: number) => {
    const users = data.users ?? [];

    if (page === 0) {
      setAllUsers(users);
    } else {
      setAllUsers((prev) => [...prev, ...users]);
    }

    setHasMore(data.total > LIMIT_QUERY * (page + 1));
  };

  useEffect(() => {
    if (inView && hasMore && !isLoadingUser) {
      setTotalPage((prev) => prev + 1);
    }
  }, [inView, isLoadingUser]);

  useEffect(() => {
    setAllUsers([]);
    setTotalPage(0);
    setHasMore(true);
    setIsLoadingUser(true);
  }, [debounceFilter, sortingParam.key, sortingParam.value]);

  useEffect(() => {
    let cancelled = false;

    setIsLoadingUser(true);

    getUsers(totalPage, sortingParam, debounceFilter)
      .then((data) => {
        if (cancelled) return;

        handleUsersLoad(data, totalPage);
      })
      .catch((error) => {
        if (cancelled) return;

        console.error(error);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });

    return () => {
      cancelled = true;
    };
  }, [totalPage, debounceFilter, sortingParam.key, sortingParam.value]);

  return (
    <>
      <div>
        Поиск по таблице. Только поля ФИО и email
        <FieldInput
          onChange={(newFilterValue: string) => setFilterParam(newFilterValue)}
        />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {Object.entries(TABLE_HEADERS).map(([id, title]) => (
              <TitleTable
                key={id}
                id={id}
                title={title}
                sorting={sortingParam}
                onClick={(newSorting: Sort) => setSortingParam(newSorting)}
              />
            ))}
          </tr>
        </thead>

        {isLoadingUser && totalPage === 0 ? (
          <Skeleton />
        ) : (
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                {Object.entries(TABLE_HEADERS).map(([id]) => (
                  <UserCell key={id} id={id} user={user} />
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {hasMore && allUsers.length > 0 && (
        <div ref={ref} className={styles.trigger}>
          {isLoadingUser ? 'Загрузка...' : 'Загрузка...'}
        </div>
      )}
    </>
  );
};

export default UsersTable;
