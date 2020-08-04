import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/task-form';
import Title from './components/title.jsx';
import NavBar from './components/navbar.jsx';
import TaskList from './components/task-list.jsx';
import Alert from './components/alert.jsx';
import { fetchData, addTask, deleteTask } from './service/api.js';

const OPTIONS = [
  {
    name: 'ALL',
    filter: () => true
  },
  {
    name: 'Complete',
    filter: ({ isComplete }) => isComplete === true
  },
  {
    name: 'Incomplete',
    filter: ({ isComplete }) => isComplete === false
  }
]

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(0);
  const [alert, setAlert] = useState(false);

  async function fetchTasks() {
    // You can await here
    const items = await fetchData('http://localhost:5000/tasks');
    // ...

    console.log(items);
    setTasks(items);
  }

  useEffect(() => {

    fetchTasks();

  }, []);

  const updateSelected = (event) => {

    setSelected(event);
  }

  const handleRemoveTask = (removedTaskId) => {

    console.log('http://localhost:5000/tasks/' + removedTaskId);

    deleteTask('http://localhost:5000/tasks/' + removedTaskId, tasks.filter(({ ID }) => ID === removedTaskId));

    fetchTasks();
  }

  const updateInput = (event) => {

    event.preventDefault();
    const value = event.target.value;
    setInput(value);
  }

  const handleAddTask = (event) => {
    event.preventDefault();

    if(input === '') {
      setAlert(true);
      return;
    }

    setShowToFalse();

    addTask('http://localhost:5000/tasks', input);

    setInput('');

    fetchTasks();
  }
  
  const flipStatus = (taskToFlip) => {
    this.setState((currentState) => {
      const task = currentState.tasks.find((task) => task.taskName === taskToFlip);
      return {
        tasks: currentState.tasks.filter((task) => task.taskName !== taskToFlip)
          .concat([{
            taskName: task.taskName,
            complete: !task.complete
          }]),
      };
    });
  }

  const setShowToFalse = () => {
    setAlert(false);
  }


  return (
    <div className='App'>
      <Title/>
      <Alert
        show={alert}
        setShow={setShowToFalse}
      />
      <TaskForm 
        input={input}
        updateInput={updateInput}
        handleAddTask={handleAddTask}
      />
      <NavBar
        options={OPTIONS.map(({ name }) => name)}
        selected={selected}
        select={updateSelected}
      />
      <TaskList
        taskList={tasks.filter(OPTIONS[selected].filter)}
        flipStatus={flipStatus}
        onRemoveTask={handleRemoveTask}
      />
    </div>
  );
};

export default App;
