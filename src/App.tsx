import { v4 as uuidv4 } from 'uuid';
import { Task } from './components/Task';
import { Header } from './components/Header';
import { PlusCircle, Clipboard } from 'phosphor-react'

import './global.css';
import styles from './App.module.css';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

export interface Tasks {
  id: string;
  title: string;
  isChecked: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const totalOfTasks = tasks.length;
  const doneTasks = tasks.filter(task => task.isChecked === true);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, {
      id: uuidv4(),
      title: newTaskText,
      isChecked: false,
    }]);

    setNewTaskText('');
  }

  function deleteTask(idTaskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(({id}) => {
      return id !== idTaskToDelete;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function checkTask(id: string) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id == id;
    });
    const atualTasks = [...tasks];

    atualTasks[taskIndex].isChecked = !atualTasks[taskIndex].isChecked;

    setTasks(atualTasks);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  function handleNewTaskchange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.searchBar}>
          <input
            type="text"
            name="task"
            value={newTaskText}
            onChange={handleNewTaskchange}
            placeholder='Adicione uma nova tarefa'
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type='submit'>Criar <PlusCircle size={16} /></button>
        </form>

        <main className={styles.tasksContainer}>
          <div className={styles.countTasksBar}>
            <div className={styles.tasksCreated}>
              Tarefas criadas
              <span className={styles.counter}>{totalOfTasks}</span>
            </div>

            <div className={styles.tasksDone}>
              Concluídas
              <span className={styles.counter}>{doneTasks.length} de {totalOfTasks}</span>
            </div>
          </div>
          <div className={styles.tasksList}>

            {totalOfTasks > 0
              ? <div className={styles.tasks}>

                {tasks.map(task => {
                  const { id, title, isChecked } = task;
                  return (
                    <Task
                      key={id}
                      id={id}
                      title={title}
                      isChecked={isChecked}
                      onCheckTask={checkTask}
                      onDeleteTask={deleteTask}
                    />
                  )
                })}

              </div>
              : <div className={styles.noTasks}>
                <Clipboard size={56} weight="light" />
                <div>
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <span>Crie tarefas e organize seus itens a fazer</span>
                </div>
              </div>
            }
          </div>
        </main>
      </div>
    </div>
  )
}
