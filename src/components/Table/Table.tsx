import styles from './Table.module.css';
import { TitleTable } from '@/components';
import { type Sort, type User, UserTableRow } from '@/entities/users';
import { TABLE_HEADERS } from '@/shared/utils';
import { Skeleton } from '@/shared/ui';

interface Props {
  isLoadingUser: boolean;
  allUsers: User[];
  totalPage: number;
  sortingParam: Sort;
  setSortingParam: (newSorting: Sort) => void;
  openDetailsUser: (id: number) => void;
}

const Table = (props: Props) => {
  const {
    isLoadingUser,
    allUsers,
    totalPage,
    sortingParam,
    setSortingParam,
    openDetailsUser,
  } = props;

  return (
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
            <UserTableRow
              key={user.id}
              user={user}
              onClick={(id: number) => openDetailsUser(id)}
            />
          ))}
        </tbody>
      )}
    </table>
  );
};

export default Table;
