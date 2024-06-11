import { useState } from 'react'
import axios from 'axios'
import CONFIG from '../config'
import crossIcon from '../icons/cross.svg'

function TodoItem(props: {
  key: string, 
  id: string,
  description: string,
  completed: boolean,
  refreshToDos: () => void,
}) {
  const [completed, setCompleted] = useState(props.completed)

  const updateTodoItem = async (newCompleted) => {
    try {
      await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
        id: props.id,
        description: props.description,
        completed: newCompleted,
      })
    } catch (error) {
      console.error('Error updating todo item:', error)
    }
  }

  const deleteTodoItem = async () => {
    try {
      await axios.delete(`${CONFIG.API_ENDPOINT}/todos/${props.id}`)
      props.refreshToDos() // Call refreshToDos after the todo item is successfully deleted
    } catch (error) {
      console.error('Error deleting todo item:', error)
    }
  }

  const toggleCompleted = async () => {
    const newCompleted = !completed
    setCompleted(newCompleted)
    await updateTodoItem(newCompleted) // Pass the new `completed` state directly to the update function
  }

  return (
    <>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={completed}
          style={{ transform: 'scale(1.5)' }}
          onChange={toggleCompleted}
        />
        <span style={{ flexGrow: 1, color: '#344054' }}>
          {props.description}
        </span>
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
          onClick={() => deleteTodoItem()}
        >
          <img src={crossIcon} alt="Delete" className="delete-icon" />
        </button>
      </div>
    </>
  )
}

export default TodoItem
