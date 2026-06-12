import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div
    className={styles.overlay}
    data-testid='test-id-modal-overlay'
    onClick={onClick}
  />
);
