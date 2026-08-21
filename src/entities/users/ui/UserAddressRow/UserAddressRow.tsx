import type { Address } from '@/entities/users';
import { InfoRow } from '@/shared/ui';
import { ADDRESS_LABELS } from '@/shared/utils';
import styles from './UserAddressRow.module.css';

interface Props {
  label: string;
  value: Address;
}

const UserAddressRow = (props: Props) => {
  const { label, value } = props;

  return (
    <div>
      <span>{label}</span>
      <div className={styles.address}>
        {(
          Object.entries(ADDRESS_LABELS) as [
            keyof Omit<Address, 'coordinates'>,
            string,
          ][]
        ).map(([key, fieldLabel]) => (
          <InfoRow key={key} label={fieldLabel} value={value?.[key]} />
        ))}
      </div>
    </div>
  );
};

export default UserAddressRow;
