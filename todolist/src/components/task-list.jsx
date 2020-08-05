import React from 'react';
import TaskCard from '../components/task-card.jsx';


function TaskList({ taskList, flipStatus, onRemoveTask }) {


  return (
    <div className="container">
      <ul className="todo-list">
        {taskList.map(({ task, id, complete }) => (
          <TaskCard
            key={id}
            id={id}
            taskName={task}
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