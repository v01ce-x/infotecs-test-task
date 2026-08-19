import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={`${styles.loaderWrapper}`}>
      <div className={styles.spinner} role="status" aria-label="Загрузка" />
    </div>
  );
};

export default Loader;
