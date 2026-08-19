import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  type ApiUsersResponse,
  type User,
  type Sort,
  TABLE_HEADERS,
  LIMIT_QUERY,
  getUsers,
  UserTableRow,
  TitleTable,
} from '@/features/users';
import { FieldInput, Skeleton } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks';
import styles from './UsersTable.module.css';

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
      .catch(() => {
        if (cancelled) return;
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
              <UserTableRow key={user.id} user={user} />
            ))}
          </tbody>
        )}
      </table>

      {hasMore && allUsers.length > 0 && (
        <div ref={ref} className={styles.trigger}>
          'Загрузка...'
        </div>
      )}
    </>
  );
};

export default UsersTable;
