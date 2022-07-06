import * as React from 'react';
import { RiSaveFill } from 'react-icons/ri';

export interface TaskAddProp {
  createHandler: (text: string) => void;
}

export default function TaskAdd({ createHandler }: TaskAddProp) {
  const [textForm, setTextForm] = React.useState('');

  const onChangeClick = () => {
    if (textForm.length === 0) {
      return;
    }
    createHandler(textForm);
    setTextForm('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="New task to do..."
        value={textForm}
        onChange={(e) => setTextForm(e.target.value)}
      />
      <div className="task-form-footer">
        <RiSaveFill className="primary" onClick={onChangeClick} />
      </div>
    </div>
  );
}
