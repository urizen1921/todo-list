import React from 'react';
import TaskCard from '../components/task-card.jsx';


function TaskList({ taskList, flipStatus, onRemoveTask }) {


  return (
    <div className="container">
      <ul className="todo-list">
        {taskList.map(({ task, ID, isComplete }) => (
          <TaskCard
            key={ID}
            id={ID}
            taskName={task}
            complete={isComplete}
            flipStatus={flipStatus}
            onRemoveTask={onRemoveTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;