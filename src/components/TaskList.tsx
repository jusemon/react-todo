import * as React from 'react';
import TaskItem from './TaskItem';

export interface Task {
  id: string;
  text: string;
  createdAt: Date;
  completed: boolean;
}

export interface TaskListProp {
  tasks: ReadonlyArray<Task>;
  deleteTaskHandler: (id: string) => () => void;
  updateTaskHandler: (id: string) => (text: string, completed: boolean) => void;
}

export default function TaskList({
  tasks,
  updateTaskHandler,
  deleteTaskHandler,
}: TaskListProp) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          text={task.text}
          completed={task.completed}
          deleteTaskHandler={deleteTaskHandler(task.id)}
          updateTaskHandler={updateTaskHandler(task.id)}
        />
      ))}
    </div>
  );
}
