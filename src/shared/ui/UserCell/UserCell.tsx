import type { User } from '@/features/users';
import { getNestedValue } from '@/shared/utils';
import style from './UserCell.module.css';

interface Props {
  id: string;
  user: User;
}

const UserCell = (props: Props) => {
  const { id, user } = props;

  const value = getNestedValue(user, id);

  return (
    <td>
      {value ? (
        <span>{value}</span>
      ) : (
        <span className={style.notSpecified}>Not specified</span>
      )}
    </td>
  );
};

export default UserCell;
