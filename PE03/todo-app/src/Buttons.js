
export function AddButton({ list, setList, taskTitle, setInputValue }) {
    const handleClick = () => {
        if (!taskTitle.trim()) return; // Don't add empty tasks
        const newId = Date.now();
        setList([...list, { id: newId, title: taskTitle }]);
        setInputValue(''); // Clear input after adding
    }
    return (
        <button className="add-btn" onClick={handleClick}>Add Task</button>
    );
}

export function DeleteButton({ list, setList, task }) {
    const handleClick = () => {
        const newList = list.filter((t) => t.id !== task.id);
        setList(newList);
    }
    return (
        <button className="del-btn" onClick={handleClick}>Delete</button>
    );
}