import { useState } from 'react'
import axios from 'axios'
import CONFIG from '../config'
import crossIcon from '../icons/cross.svg'

function TodoItem(props) {
  //* Exercise 3B
  const [completed, setCompleted] = useState(props.completed)

  //* updateTodoItem function is used to update the state of completion of the TodoItem by making an api call via the PUT method
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

  //* toggleCompleted function updates the TodoItem 'completed' state based on the whether he checkbox is checked or not
  const toggleCompleted = async () => {
    //* Insert code logic here
  }

  return (
    <>
      <div className="todo-item">
        <input
          type="checkbox"
          style={{ transform: 'scale(1.5)' }}

          //* Add the following 2 properties to manage the change in state of the checkbox based on user inputs
          // checked={add function here}
          // onChange={add function here}
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
