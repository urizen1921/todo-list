import React from 'react';
import TrashIcon from '../icons/trash-icon.jsx';

function Badge({ text, bgClass }) {
  return <span className={`badge text-white float-right ${bgClass}`}>{text}</span>; 
}

function TaskCard({ taskName, complete, flipStatus, onRemoveTask }) {

  const badgeText = (complete) => { return complete ? 'complete' : 'incomplete' };
  const badgeBgClass = (complete) => { return complete ? 'badge-success' : 'badge-warning' };
  const textColor = (complete) => {return complete ? 'text-success' : 'text-warning' };

  return(
    <li
      className="task-card"
      key={taskName}>
      <div
        className="w-75 pointer"
        onClick={() => flipStatus(taskName)}>
        <p
          className={`font-weight-bold m-0 pl-3 d-flex justify-content-between align-items-center ${textColor(complete)}`}
        >
          {taskName} <Badge text={badgeText(complete)} bgClass={badgeBgClass(complete)} />
        </p>
      </div>
      <div>
        <button
          className="btn-remove"
          onClick={() => onRemoveTask(taskName)}>
          <TrashIcon/>
        </button>
      </div>
    </li>
  );
}

export default TaskCard;