import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { UsersTable, UserDetailsModal } from '@/components';
import { type User, type Sort, useUsers, userService } from '@/entities/users';
import { FieldInput } from '@/shared/ui';
import { useDebounce } from '@/shared/hooks';
import { scrollControl } from '@/shared/utils';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [userDetails, setUserDetails] = useState<User>();
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);

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

  const {
    users,
    isLoading: isLoadingUsers,
    totalPage,
    hasMore,
  } = useUsers({ filter: debounceFilter, sortingParam, inView });

  const openUserDetails = useCallback((id: number) => {
    setIsLoadingUserDetails(true);
    setIsOpenModal(true);

    userService.getById(id).then((user) => {
      setUserDetails(user);
      setIsLoadingUserDetails(false);
    });
  }, []);

  useEffect(() => {
    scrollControl(isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <div>
        Поиск по таблице. Только поля ФИО и email
        <FieldInput
          onChange={(newFilterValue: string) => setFilterParam(newFilterValue)}
        />
      </div>

      <UsersTable
        isLoading={isLoadingUsers}
        users={users}
        totalPage={totalPage}
        sortingParam={sortingParam}
        setSortingParam={(newSorting) => setSortingParam(newSorting)}
        openUserDetails={openUserDetails}
      />

      {hasMore && users.length > 0 && (
        <div ref={ref} className={styles.trigger}>
          'Загрузка...'
        </div>
      )}

      <UserDetailsModal
        closeModal={() => setIsOpenModal(false)}
        isOpenModal={isOpenModal}
        user={userDetails}
        isLoading={isLoadingUserDetails}
      />
    </>
  );
};

export default UsersPage;
