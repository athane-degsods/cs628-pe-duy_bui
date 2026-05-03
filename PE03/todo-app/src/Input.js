
export default function TaskInput( { inputValue, setInputValue }) {

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <input
            className="task-input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter task description"
        />
    );
}