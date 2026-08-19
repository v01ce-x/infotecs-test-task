import { type User, UserTableCell, TABLE_HEADERS } from '@/features/users';
import styles from './UserTableRow.module.css';

interface Props {
  user: User;
}

const UserTableRow = (props: Props) => {
  const { user } = props;

  return (
    <tr className={styles.userRow}>
      {Object.entries(TABLE_HEADERS).map(([id]) => (
        <UserTableCell key={id} id={id} user={user} />
      ))}
    </tr>
  );
};

export default UserTableRow;
