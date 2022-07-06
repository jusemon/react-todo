import * as React from 'react';
import { nanoid } from 'nanoid';
import Swal from 'sweetalert2';
import TaskList, { Task } from './components/TaskList';
import TaskAdd from './components/TaskAdd';
import { Routes, Route, NavLink } from 'react-router-dom';
import './style.css';

export default function App() {
  const [tasks, setTasks] = React.useState<Array<Task>>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  const createTaskHandler = (text: string) => {
    setTasks([
      ...tasks,
      { text, id: nanoid(), createdAt: new Date(), completed: false },
    ]);
  };

  const updateTaskHandler =
    (id: string) => (text: string, completed: boolean) => {
      const task = tasks.find((n) => n.id === id);
      if (task) {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1, { ...task, text, completed });
        setTasks([...tasks]);
      }
    };

  const deleteTaskHandler = (id: string) => () => {
    const task = tasks.find((n) => n.id === id);
    if (task) {
      const index = tasks.indexOf(task);
      const message = `Are you sure that you want to delete the task "${task.text}"?`;
      Swal.fire({
        title: 'Caution',
        text: message,
        icon: 'question',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          tasks.splice(index, 1);
          setTasks([...tasks]);
        }
      });
    }
  };

  const isNavigationActiveClass = ({ isActive }: { isActive: boolean }) =>
    `app-navigation-item ${isActive && 'selected'}`;

  return (
    <div className="app">
      <h1 className="app-title">To Do App</h1>
      <div className="app-navigation">
        <div className="app-navigation-content">
          <TaskAdd createHandler={createTaskHandler} />
        </div>
        <div className="app-navigation-items">
          <NavLink className={isNavigationActiveClass} to="/">
            All
          </NavLink>
          <NavLink className={isNavigationActiveClass} to="/done">
            Completed
          </NavLink>
          <NavLink className={isNavigationActiveClass} to="/todo">
            To do
          </NavLink>
        </div>
        <div className="app-navigation-content">
          <Routes>
            <Route
              path="/"
              element={
                <TaskList
                  tasks={tasks}
                  updateTaskHandler={updateTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                />
              }
            />
            <Route
              path="/done"
              element={
                <TaskList
                  tasks={tasks.filter((task) => task.completed)}
                  updateTaskHandler={updateTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                />
              }
            />
            <Route
              path="/todo"
              element={
                <TaskList
                  tasks={tasks.filter((task) => !task.completed)}
                  updateTaskHandler={updateTaskHandler}
                  deleteTaskHandler={deleteTaskHandler}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
