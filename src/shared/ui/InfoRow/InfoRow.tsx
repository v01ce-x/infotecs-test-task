import styles from './InfoRow.module.css';

interface Props {
  label: string;
  value: string | number;
}

const InfoRow = (props: Props) => {
  const { label, value } = props;

  return (
    <div className={styles.infoRow}>
      <span className={styles.infoRow__label}>{label}</span>
      <p className={styles.infoRow__value}>{value}</p>
    </div>
  );
};

export default InfoRow;
