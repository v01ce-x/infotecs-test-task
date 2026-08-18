import styles from './Skeleton.module.css';

const Skeleton = () => {
  const TotalNumberOfCell = 9;
  const TotalNumberOfRow = 30;

  return (
    <tbody className={styles.skeleton}>
      {Array.from({ length: TotalNumberOfRow }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: TotalNumberOfCell }).map((_, j) => (
            <td className={styles.skeleton__cell} key={j}>
              &nbsp;
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Skeleton;
