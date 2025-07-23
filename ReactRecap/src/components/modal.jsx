import classes from './modal.module.css';

export default function Modal({ children, toggleModalHandler }) {
  return (
    <>
      <div className={classes.backdrop} onClick={toggleModalHandler} />
      <dialog className={classes.modal} open>
        {children}
      </dialog>
    </>
  );
}
