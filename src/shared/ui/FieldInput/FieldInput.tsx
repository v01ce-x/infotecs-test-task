import styles from './FieldInput.module.css';

interface Props {
  onChange: (value: string) => void;
}

const FieldInput = (props: Props) => {
  const { onChange } = props;

  return (
    <div className={styles.fieldPrimary}>
      <div className={styles.field__wrap}>
        <input
          className={styles.field__input}
          onChange={(event) => onChange(event.currentTarget?.value)}
        />
      </div>
    </div>
  );
};

export default FieldInput;
