import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
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

  const toggleDone = useCallback(() => {
    setDone(!done)
    // updateTodoItem(!done); // Pass the new done state to the update function
  }, [done])

  const updateTodoItem = useCallback(async () => {
    // Checkpoint 2: How can we pass the `done` state to our endpoint?
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      done: false,
    })
  }, [props.description, props.id])

  const deleteTodoItem = useCallback(async () => {
    await axios.delete(`${CONFIG.API_ENDPOINT}/todos/${props.id}`)
  }, [props.id])

  // Checkpoint 3: Implement a method like "updateTodoItem" to delete a TodoItem

  // Checkpoint 4.1: Implement a method like "updateTodoItem" to generate the ChatGPT content

  useEffect(() => {
    // Checkpoint 2: How can we call updateTodoItem() when done is modified?
    updateTodoItem()
  }, [props.description, updateTodoItem])

  return (
    <>
      {/* <tr>
        <td>
          <FormCheck
            // Checkpoint 2: Update the onChange and checked props using state
          />
        </td>
        <td width={"100%"}>{props.description}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <Button // Checkpoint 4.2: Considering how long it takes to generate the content, how could using state be helpful here? (eg. isLoading, setIsLoading) 
              size="sm"
              style={{ marginRight: 16 }}
              disabled={true}
            >
              Generate
            </Button>
            <img // Checkpoint 3: How can we click on this icon to delete this particular TodoItem
              alt="delete-icon"
              src={crossIcon}
              className="delete-icon"
            />
          </div>
        </td>
      </tr> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '20px 35px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="checkbox"
          checked={done}
          style={{ transform: 'scale(1.5)' }}
          onChange={() => setDone(!done)}
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
