import React from 'react';

function TaskForm(props) {
  return(
    <div>
      <form
        onSubmit={props.handleAddTask}
      >
        <input
          type="text"
          placeholder="New task..."
          value={props.input}
          onChange={props.updateInput}
        />
        <button
          className="addBtn">
          Add
        </button>
      </form>
    </div>
  );
}

export default TaskForm;