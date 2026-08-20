import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { TitleTable } from '@/components';
import { type Sort, type User, UserTableRow } from '@/entities/users';
import { TABLE_HEADERS } from '@/shared/utils';
import { Skeleton } from '@/shared/ui';
import styles from './Table.module.css';

interface Props {
  isLoadingUser: boolean;
  allUsers: User[];
  totalPage: number;
  sortingParam: Sort;
  setSortingParam: (newSorting: Sort) => void;
  openDetailsUser: (id: number) => void;
}

const Table = (props: Props) => {
  const {
    isLoadingUser,
    allUsers,
    totalPage,
    sortingParam,
    setSortingParam,
    openDetailsUser,
  } = props;

  const [colWidths, setColWidths] = useState<Record<string, number>>({
    lastName: 150,
    firstName: 150,
    maidenName: 150,
    age: 80,
    gender: 100,
    phone: 180,
    email: 300,
    'address.country': 80,
    'address.city': 80,
  });

  const resizeInfo = useRef<{
    activeId: string;
    startWidth: number;
    startX: number;
  } | null>(null);

  const handleResizeStart = (id: string, event: React.MouseEvent) => {
    resizeInfo.current = {
      activeId: id,
      startWidth: colWidths[id],
      startX: event.clientX,
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (event: MouseEvent) => {
    if (!resizeInfo.current) return;

    const minWidthCell = 50;

    const { activeId, startWidth, startX } = resizeInfo.current;
    const deltaX = event.clientX - startX;

    const newWidth = Math.max(minWidthCell, startWidth + deltaX);

    setColWidths((prev) => ({
      ...prev,
      [activeId]: newWidth,
    }));
  };

  const handleResizeEnd = () => {
    resizeInfo.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.entries(TABLE_HEADERS).map(([id, title]) => (
              <TitleTable
                key={id}
                id={id}
                title={title}
                sorting={sortingParam}
                onClick={(newSorting: Sort) => setSortingParam(newSorting)}
                width={colWidths[id]}
                onResizeStart={handleResizeStart}
              />
            ))}
          </tr>
        </thead>

        {isLoadingUser && totalPage === 0 ? (
          <Skeleton />
        ) : (
          <tbody>
            {allUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onClick={(id: number) => openDetailsUser(id)}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Table;
