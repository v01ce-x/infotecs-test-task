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
import { TitleTable, UserCell } from '@/shared/ui';
import Skeleton from '@/shared/ui/Skeleton/Skeleton.tsx';
import { useInView } from 'react-intersection-observer';

const UsersTable = () => {
  const [allUsers, setAllUsers] = useState<User[] | []>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [totalUsers, setTotalUsers] = useState<number>(100);
  const [totalPage, setTotalPage] = useState(0);

  const [sorting, setSorting] = useState<Sort>({
    key: '',
    direction: 'none',
  });

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  const handleUsersLoad = (data: ApiUsersResponse, isReset = false) => {
    setTotalUsers(data.total);

    if (totalUsers - LIMIT_QUERY * (totalPage + 1) <= 0) setTotalPage(-1);

    const users = data.users;

    if (users && !isReset) {
      setAllUsers([...allUsers, ...users]);
    } else if (users && isReset) {
      setAllUsers(users);
    }

    setIsLoadingUser(false);
  };

  useEffect(() => {
    if (inView && totalPage !== -1) {
      setTotalPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    getUsers(totalPage, sorting).then((data) => handleUsersLoad(data));
  }, [totalPage]);

  useEffect(() => {
    getUsers(totalPage, sorting).then((data) => handleUsersLoad(data, true));
  }, [sorting.key, sorting.direction]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.entries(TABLE_HEADERS).map((header) => (
              <TitleTable
                key={header[0]}
                id={header[0]}
                title={header[1]}
                sorting={sorting}
                onClick={(sorting: Sort) => setSorting(sorting)}
              />
            ))}
          </tr>
        </thead>
        {isLoadingUser ? (
          <Skeleton />
        ) : (
          <tbody>
            {allUsers &&
              allUsers.map((user) => (
                <tr key={user.id}>
                  {Object.entries(TABLE_HEADERS).map((cell) => (
                    <UserCell key={cell[0]} id={cell[0]} user={user} />
                  ))}
                </tr>
              ))}
          </tbody>
        )}
      </table>
      {totalPage !== -1 && (
        <div ref={ref} className={styles.trigger}>
          Загрузка...
        </div>
      )}
    </>
  );
};

export default UsersTable;
