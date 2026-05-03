import './App.css';
import TaskInput from './Input';
import { AddButton } from './Buttons';
import { TasksList } from './TasksList';
import { useState } from 'react'; // Importing useState to manage the state of tasks and input value

let sample_tasks = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
  { id: 3, title: 'Task 3' },
];

function App() {
  const [tasks, setTasks] = useState(sample_tasks);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <div className="todo-container">
        <h1>ToDo List App</h1>
        <div className="input-group"> {/* Display input field that users can enter their TODO descriptions */}
          <TaskInput inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        <div className="btn-group">
          {/* Add button that adds a TODO to the list when clicked */}
          <AddButton list={tasks} setList={setTasks} taskTitle={inputValue} setInputValue={setInputValue} />
        </div>
        {/* Display the list of TODOs, each with a delete button to remove it from the list */}
        <TasksList list={tasks} setList={setTasks} />
      </div>
    </div>
  );
}

// NOTE:
// - ToDo list and ToDo task components are implemented in TasksList.js
// - useState hook is implemented to manage the state of the ToDos (tasks)
// - Event handlers (onChange and onClick) are implemented to handle user interactions
// - .map() method is used to render the list of ToDos dynamically (in TasksList.js)
// - CSS styling is applied to make the app visually appealing (in App.css)


export default App;
