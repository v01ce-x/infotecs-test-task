import { AnimatePresence, motion } from 'motion/react';
import { CrossIcon, Loader } from '@/shared/ui';
import { UserDetailsInfo } from '@/components';
import type { User } from '@/entities/users';
import styles from './UserDetailsModal.module.css';

interface Props {
  closeModal: () => void;
  isOpenModal: boolean;
  isLoadingUserDetails: boolean;
  userDetails: User | undefined;
}

const userDetailsModal = (props: Props) => {
  const { userDetails, closeModal, isOpenModal, isLoadingUserDetails } = props;

  return (
    <AnimatePresence>
      {isOpenModal && (
        <div className={styles.modal} onClick={closeModal}>
          {isLoadingUserDetails ? (
            <Loader />
          ) : (
            <motion.div
              className={styles.modal__inner}
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modal__header}>
                <CrossIcon className={styles.icon} onClick={closeModal} />
                <h2>Детальная информация о пользователя</h2>
              </div>

              <UserDetailsInfo user={userDetails} />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default userDetailsModal;
