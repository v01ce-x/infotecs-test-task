import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  VARIANTS_SORTING,
  SORTING_FIELDS,
  type Sort,
  type SortingVariants,
} from '@/features/users';
import styles from './TitleTable.module.css';

interface Props {
  title: string;
  id: string;
  sorting: Sort;
  onClick: (sorting: Sort) => void;
}

const TitleTable = (props: Props) => {
  const { title, id, sorting, onClick } = props;

  const [isOpenSorting, setIsOpenSorting] = useState(false);
  const cellRef = useRef<HTMLTableCellElement | null>(null);

  const getSortIconClass = (direction: string) => {
    return sorting.key === id && sorting.value === direction
      ? styles.sorting__asc
      : styles.sorting__none;
  };

  const setSorting = (direction: SortingVariants) => {
    if (direction === 'none') {
      onClick({
        key: '',
        value: direction,
      });
    } else {
      onClick({
        key: id,
        value: direction,
      });
    }

    setIsOpenSorting(false);
  };

  useEffect(() => {
    if (!isOpenSorting) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (cellRef.current && !cellRef.current.contains(event.target as Node)) {
        setIsOpenSorting(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpenSorting]);

  return (
    <>
      {SORTING_FIELDS.find((field) => field === id) ? (
        <th className={styles.cell} ref={cellRef}>
          <div
            className={styles.cell__wrapper}
            onClick={() => setIsOpenSorting(!isOpenSorting)}
          >
            <span></span>
            <span>{title}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.70624 2.2937C6.31561 1.90308 5.68124 1.90308 5.29061 2.2937L2.29061 5.2937C2.00311 5.5812 1.91874 6.00933 2.07499 6.38433C2.23124 6.75933 2.59686 6.99995 2.99999 6.99995H4.99999V17C4.99999 17.5531 5.44686 18 5.99999 18C6.55311 18 6.99999 17.5531 6.99999 17V6.99995H8.99999C9.40311 6.99995 9.76874 6.7562 9.92499 6.3812C10.0812 6.0062 9.99374 5.57808 9.70936 5.29058L6.70936 2.29058L6.70624 2.2937Z"
                className={getSortIconClass('asc')}
              />
              <path
                d="M14.7087 17.7063C14.3181 18.0969 13.6837 18.0969 13.2931 17.7063L10.2931 14.7063C10.0056 14.4188 9.92118 13.9907 10.0774 13.6157C10.2337 13.2407 10.5993 13 11.0024 13H13.0024V3.00005C13.0024 2.44692 13.4493 2.00005 14.0024 2.00005C14.5556 2.00005 15.0024 2.44692 15.0024 3.00005V13H17.0024C17.4056 13 17.7712 13.2438 17.9274 13.6188C18.0837 13.9938 17.9962 14.4219 17.7118 14.7094L14.7118 17.7094L14.7087 17.7063Z"
                className={getSortIconClass('desc')}
              />
            </svg>
          </div>
          <AnimatePresence>
            {isOpenSorting && (
              <motion.div
                className={styles.sorting__menu}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 40, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
              >
                {Object.entries(VARIANTS_SORTING).map((variantSorting) => (
                  <span
                    key={variantSorting[0]}
                    className={styles.sorting__value}
                    onClick={() =>
                      setSorting(variantSorting[0] as SortingVariants)
                    }
                  >
                    {variantSorting[1]}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </th>
      ) : (
        <th>
          <span>{title}</span>
        </th>
      )}
    </>
  );
};

export default TitleTable;
