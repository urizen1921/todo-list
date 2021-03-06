import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/task-form';
import Title from './components/title.jsx';
import NavBar from './components/navbar.jsx';
import TaskList from './components/task-list.jsx';
import Alert from './components/alert.jsx';
import { fetchData, addTask, deleteTask, updateTask } from './service/api.js';

const URL = [
  {
    go: 'http://localhost:5000/tasks/',
    java: 'http://localhost:8080/todolist/api/todoitem/'
  }
];


const OPTIONS = [
  {
    name: 'ALL',
    filter: () => true
  },
  {
    name: 'Complete',
    filter: ({ complete }) => complete === true
  },
  {
    name: 'Incomplete',
    filter: ({ complete }) => complete === false
  }
]

const App = () => {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState(0);
  const [alert, setAlert] = useState(false);

  async function fetchTasks() {
    // You can await here
    const items = await fetchData(URL[0].java);
    // ...

    setTasks(items);
  }

  useEffect(() => {

    fetchTasks();


  }, []);

  const updateSelected = (event) => {

    setSelected(event);
  }

  const handleRemoveTask = async (removedTaskId) => {

    await deleteTask(URL[0].java + removedTaskId, tasks.filter(({ id }) => id === removedTaskId));
    fetchTasks();

  }

  const updateInput = (event) => {

    event.preventDefault();
    const value = event.target.value;
    setInput(value);
  }

  const handleAddTask = async (event) => {
    event.preventDefault();

    if(input === '') {
      setAlert(true);
      return;
    }

    setShowToFalse();

    await addTask(URL[0].java, input);

    setInput('');
    fetchTasks();
    
  }
  
  const flipStatus = async (taskIdToFlip) => {

    const task = tasks.find((task) => task.id === taskIdToFlip);

    await updateTask(URL[0].java + taskIdToFlip, {
      ...task,
      complete: !task.complete 
    });

    fetchTasks();

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
