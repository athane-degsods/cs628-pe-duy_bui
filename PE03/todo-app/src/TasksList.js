import { DeleteButton } from './Buttons';

// The ToDo task component
export function TaskItem({ task, list, setList }) {
    return (
        <li>
            <span className="task-text" title={task.title}>{task.title}</span>
            <DeleteButton list={list} setList={setList} task={task} />
        </li>
    );
}

// The ToDo list component
export function TasksList( { list, setList }) {
    return (
        <ul>
            {list.map(task => (
                <TaskItem key={task.id} task={task} list={list} setList={setList} />
            ))}
        </ul>
    );
} 