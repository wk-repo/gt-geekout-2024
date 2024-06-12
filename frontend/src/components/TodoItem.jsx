import { useState } from 'react'
import axios from 'axios'
import CONFIG from '../config'
import crossIcon from '../icons/cross.svg'

function TodoItem(props) {
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

  //* Exercise 2B
  const deleteTodoItem = async () => {
    //* Fill in code
  }

  return (
    <>
      <div className="todo-item">
        <input type="checkbox" style={{ transform: 'scale(1.5)' }} />
        <span style={{ flexGrow: 1, color: '#344054' }}>
          {props.description}
        </span>
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
          }}
          //* Remember to use the onClick property to trigger the deletion
          // onClick={...}
        >
          <img src={crossIcon} alt="Delete" className="delete-icon" />
        </button>
      </div>
    </>
  )
}

export default TodoItem
