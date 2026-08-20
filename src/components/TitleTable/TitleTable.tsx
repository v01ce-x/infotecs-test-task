import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { type Sort, type SortingVariants } from '@/entities/users';
import styles from './TitleTable.module.css';
import { SORTING_FIELDS, VARIANTS_SORTING } from '@/shared/utils';
import { SortingIcon } from '@/shared/ui';

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
            <SortingIcon
              classNameLeftArrow={getSortIconClass('asc')}
              classNameRightArrow={getSortIconClass('desc')}
            />
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
