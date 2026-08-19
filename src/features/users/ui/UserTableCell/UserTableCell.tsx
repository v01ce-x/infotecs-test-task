import type { User } from '@/features/users';
import { getNestedValue } from '@/shared/utils';
import styles from './UserTableCell.module.css';

interface Props {
  id: string;
  user: User;
}

const UserTableCell = (props: Props) => {
  const { id, user } = props;

  const value = getNestedValue(user, id);

  return (
    <td>
      {value ? (
        <span>{value}</span>
      ) : (
        <span className={styles.notSpecified}>Not specified</span>
      )}
    </td>
  );
};

export default UserTableCell;
