import React from 'react';
import TaskCard from '../components/task-card.jsx';


function TaskList({ taskList, flipStatus, onRemoveTask }) {


  return (
    <div className="container">
      <ul className="todo-list">
        {taskList.map(({ taskName, complete }) => (
          <TaskCard
            key={taskName}
            taskName={taskName}
            complete={complete}
            flipStatus={flipStatus}
            onRemoveTask={onRemoveTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;