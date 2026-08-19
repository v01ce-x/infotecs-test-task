import { InfoRow } from '@/shared/ui';
import type { Address } from '@/entities/users';
import styles from './AddressUserRow.module.css';

interface Props {
  label: string;
  value: Address;
}

const AddressUserRow = (props: Props) => {
  const { label, value } = props;

  return (
    <div>
      <span>{label}</span>
      <div className={styles.address}>
        <InfoRow label="Адрес" value={value.address} />
        <InfoRow label="Город" value={value.city} />
        <InfoRow label="Государство" value={value.state} />
        <InfoRow label="Код государства" value={value.stateCode} />
        <InfoRow label="Почтовый индекс" value={value.postalCode} />
        <InfoRow label="Страна" value={value.country} />
      </div>
    </div>
  );
};

export default AddressUserRow;
