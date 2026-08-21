import { type User, UserTableCell } from '@/entities/users';
import styles from './UserTableRow.module.css';
import { TABLE_HEADERS } from '@/shared/utils';
import { memo } from 'react';

interface Props {
  user: User;
  onClick: (id: number) => void;
}

const UserTableRow = (props: Props) => {
  const { user, onClick } = props;

  return (
    <tr className={styles.userRow} onClick={() => onClick(user.id)}>
      {Object.entries(TABLE_HEADERS).map(([id]) => (
        <UserTableCell key={id} id={id} user={user} />
      ))}
    </tr>
  );
};

export default memo(UserTableRow);
