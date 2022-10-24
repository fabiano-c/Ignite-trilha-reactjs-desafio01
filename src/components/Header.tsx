import logoImg from '../assets/todo-logo.svg';

import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={logoImg} alt="Logo To Do List" />
        <strong>to<span>do</span></strong>
      </div>
    </header>
  );
}