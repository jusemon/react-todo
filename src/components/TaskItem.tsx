import * as React from 'react';
import {
  RiPencilFill,
  RiDeleteBinFill,
  RiDeleteBack2Fill,
  RiSaveFill,
} from 'react-icons/ri';

export interface TaskItemProp {
  text: string;
  completed: boolean;
  updateTaskHandler: (text: string, completed: boolean) => void;
  deleteTaskHandler: () => void;
}

export default function TaskItem({
  text,
  completed,
  updateTaskHandler,
  deleteTaskHandler,
}: TaskItemProp) {
  const [textForm, setTextForm] = React.useState(text);
  const [editMode, setEditMode] = React.useState(false);

  const onToggleEditClick = () => {
    setEditMode(!editMode);
  };

  const onUpdateClick = () => {
    if (textForm.length === 0) {
      return;
    }
    updateTaskHandler(textForm, completed);
    setEditMode(false);
  };

  const onToggleCompleteClick = () => {
    console.log('onToggleCompleteClick', text, !completed);
    updateTaskHandler(text, !completed);
  };

  const onDeleteClick = () => {
    deleteTaskHandler();
  };

  return (
    <div className={`task-item ${editMode && 'editing'}`}>
      {editMode ? (
        <input
          type="text"
          placeholder="New to do..."
          value={textForm}
          onChange={(e) => setTextForm(e.target.value)}
        />
      ) : (
        <div className={`task-item-text ${completed && 'completed'}`}>
          {text}
        </div>
      )}

      <div className="task-item-footer">
        {editMode ? (
          <React.Fragment>
            <RiSaveFill className="primary" onClick={onUpdateClick} />
            <RiDeleteBack2Fill className="accent" onClick={onToggleEditClick} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <input
              type="checkbox"
              checked={completed}
              onChange={onToggleCompleteClick}
            />
            <RiPencilFill className="primary" onClick={onToggleEditClick} />
            <RiDeleteBinFill className="accent" onClick={onDeleteClick} />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
