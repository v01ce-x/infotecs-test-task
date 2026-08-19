import { AddressUserRow, type User } from '@/entities/users';
import { InfoRow } from '@/shared/ui';
import styles from './UserDetailsInfo.module.css';
interface Props {
  user: User | undefined;
}

const UserDetailsInfo = (props: Props) => {
  const { user } = props;

  return (
    <>
      {user ? (
        <div className={styles.userDetails}>
          <div className={styles.userDetails__avatar}>
            <img src={user.image} alt="avatar" />
          </div>
          <InfoRow label="Фамилия" value={user.lastName} />
          <InfoRow label="Имя" value={user.firstName} />
          <InfoRow label="Отчество" value={user.maidenName} />
          <InfoRow label="Возраст" value={user.age} />
          <AddressUserRow label="Адрес" value={user.address} />
          <InfoRow label="Рост" value={`${user.height} см`} />
          <InfoRow label="Вес" value={`${user.weight} кг`} />
          <InfoRow label="Номер телефона" value={user.phone} />
          <InfoRow label="Email" value={user.email} />
        </div>
      ) : (
        <span>Hello</span>
      )}
    </>
  );
};

export default UserDetailsInfo;
