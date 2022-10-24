import { Tasks } from '../App';

import { Trash } from 'phosphor-react'

import styles from './Task.module.css';

interface TaskProps extends Tasks {
    onCheckTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function Task({id, title, isChecked, onCheckTask, onDeleteTask }: TaskProps) {
    return (
        <div className={styles.task}>
            <label>
                <input type="checkbox" defaultChecked={isChecked} onChange={() => onCheckTask(id)} />
                <div className={styles.checkmark} />

                <span>{title}</span>
            </label>
            <button onClick={() => onDeleteTask(id)}>
                <Trash size={24} />
            </button>
        </div>
    )
}