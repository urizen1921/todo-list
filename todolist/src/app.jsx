import React from 'react';
import './App.css';
import TaskForm from './components/task-form';
import Title from './components/title.jsx';
import NavBar from './components/navbar.jsx';
import TaskList from './components/task-list.jsx';
import Alert from './components/alert.jsx';

const OPTIONS = [
  {
    name: 'ALL',
    filter: () => true
  },
  {
    name: 'Complete',
    filter: ({ complete }) => complete
  },
  {
    name: 'Incomplete',
    filter: ({ complete }) => !complete
  }
]

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      input: '',
      selected: 0,
      alert: false
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.flipStatus = this.flipStatus.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.setShowToFalse = this.setShowToFalse.bind(this);

  }

  filteredTasks() {
    return this.state.tasks.filter(OPTIONS[this.state.selected].filter);
  }

  setSelected(event) {
    this.setState(() => {
      return {
        selected: event
      };
    });
  }

  handleRemoveTask(removedTask) {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter(({ taskName }) => taskName !== removedTask),
      };
    });
  }

  updateInput(event) {
    event.preventDefault();
    const value = event.target.value;
    this.setState(() => {
      return {
        input: value
      };
    });
  }

  handleAddTask(event) {
    event.preventDefault();

    if(this.state.input === '') {
      this.setState(() => {
        return {
          alert: true
        };
      });
      return;
    }

    this.setShowToFalse();

    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.concat([
          {
            taskName: this.state.input,
            complete: false
          }
        ]),
        input: '',
      };
    });
  }
  
  flipStatus(taskToFlip) {
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

  setShowToFalse() {
    this.setState(() => {
      return {
        alert: false
      };
    });
  }


  render() {
    return (
      <div className='App'>
        <Title/>
        <Alert
          show={this.state.alert}
          setShow={this.setShowToFalse}
        />
        <TaskForm 
          input={this.state.input}
          updateInput={this.updateInput}
          handleAddTask={this.handleAddTask}
        />
        <NavBar
          options={OPTIONS.map(({ name }) => name)}
          selected={this.state.selected}
          select={this.setSelected}
        />
        <TaskList
          taskList={this.filteredTasks()}
          flipStatus={this.flipStatus}
          onRemoveTask={this.handleRemoveTask}
        />
      </div>
    );
  }
}

export default App;
