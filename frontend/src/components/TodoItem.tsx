import axios from 'axios'
import { useCallback, useState } from 'react'
import CONFIG from '../config'
import crossIcon from '../icons/cross.svg'

export type TodoItemProps = {
  id: string
  description: string
  done: boolean
  refreshToDos: () => void
}

function TodoItem(props: TodoItemProps) {
  const [done, setDone] = useState(props.done)

  const updateTodoItem = useCallback(
    async (newDone: boolean) => {
      await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
        id: props.id,
        description: props.description,
        done: newDone,
      })
    },
    [props.description, props.id],
  )

  const deleteTodoItem = useCallback(async () => {
    await axios.delete(`${CONFIG.API_ENDPOINT}/todos/${props.id}`)
    props.refreshToDos() // Call refreshToDos after the todo item is successfully deleted
  }, [props.id, props.refreshToDos])

  const toggleDone = useCallback(() => {
    const newDone = !done
    setDone(newDone)
    updateTodoItem(newDone) // Pass the new `done` state directly to the update function
  }, [done, updateTodoItem])

  return (
    <>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={done}
          style={{ transform: 'scale(1.5)' }}
          onChange={toggleDone}
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
