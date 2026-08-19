import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Table, UserDetailsModal } from '@/components';
import {
  type User,
  type Sort,
  getUsers,
  getDetailsUser,
  type ApiUsersResponse,
} from '@/entities/users';
import { FieldInput } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks';
import { LIMIT_QUERY } from '@/shared/utils';
import styles from './UsersTable.module.css';

const UsersTable = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [userDetails, setUserDetails] = useState<User>();
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);

  const [totalPage, setTotalPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const openDetailsUser = (id: number) => {
    setIsLoadingUserDetails(true);
    setIsOpenModal(true);

    getDetailsUser(id).then((user) => {
      setUserDetails(user);
      setIsLoadingUserDetails(false);
    });
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
      .then((data: ApiUsersResponse) => {
        if (cancelled) return;

        handleUsersLoad(data, totalPage);
        setIsLoadingUser(false);
      })
      .catch(() => {
        if (cancelled) return;
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

      {isLoadingUserDetails.toString()}
      <Table
        isLoadingUser={isLoadingUser}
        allUsers={allUsers}
        totalPage={totalPage}
        sortingParam={sortingParam}
        setSortingParam={(newSorting) => setSortingParam(newSorting)}
        openDetailsUser={(id: number) => openDetailsUser(id)}
      />

      {hasMore && allUsers.length > 0 && (
        <div ref={ref} className={styles.trigger}>
          'Загрузка...'
        </div>
      )}

      <UserDetailsModal
        closeModal={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
        userDetails={userDetails}
        isLoadingUserDetails={isLoadingUserDetails}
      />
    </>
  );
};

export default UsersTable;
