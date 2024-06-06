import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import CONFIG from '../config'
import TodoItem, { TodoItemProps } from '../components/TodoItem'
import checkIcon from '../icons/check.svg'

function Todo() {
  const [todoItems, setTodoItems] = useState<{ [id: string]: TodoItemProps }>(
    {},
  )
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [done, setDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const today = new Date()

  useEffect(() => {
    populateTodos()
  }, [])

  const formatDate = (today: Date) => {
    return `${today.toLocaleDateString('en-UK', { weekday: 'long' })}, ${today.toLocaleDateString(
      'en-UK',
      {
        day: 'numeric',
        month: 'long',
      },
    )} 🌤️`
  }

  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`)
    setTodoItems(result.data)
  }, [])

  async function submitNewTodo() {
    setIsLoading(true)
    if (newTodoDescription.trim() !== '') {
      const newTodo = {
        description: newTodoDescription,
        done: done,
      }
      try {
        console.log(`${CONFIG.API_ENDPOINT}/todos`)
        await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo)
        await populateTodos()
        setNewTodoDescription('')
        setDone(false)
      } catch (error) {
        console.error('Error posting new todo:', error)
      }
    } else {
      alert('Invalid Todo input!')
    }
    setIsLoading(false)
  }

  return (
    <div className="todo-container">
      <div className="todo-box">
        <div className="todo-div">
          <h1 style={{ padding: '10px 0px' }}>{formatDate(today)}</h1>
          <h2 style={{ paddingBottom: '5px' }}>
            Hey there! What's the plan for today?
          </h2>
        </div>
      </div>
      <div className="input-container">
        <input
          type="checkbox"
          checked={done}
          style={{ transform: 'scale(1.5)' }}
          onChange={() => setDone(!done)}
        />
        <input
          type="text"
          style={{ flexGrow: 1, width: 600, border: 'none' }}
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          placeholder="✏️ Have a new to-do? Write it down! "
        />
        <Button
          onClick={submitNewTodo}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading ? (
            'Saving...'
          ) : (
            <>
              <img src={checkIcon} alt="Check" style={{ width: '16px' }} />
              <span style={{ whiteSpace: 'nowrap' }}>Save Task</span>
            </>
          )}
        </Button>
      </div>
      <div className="todo-items-container">
        {Object.values(todoItems).map((todo) => (
          <div style={{ marginBottom: '25px' }}>
            <TodoItem
              key={todo.id}
              id={todo.id}
              description={todo.description}
              done={todo.done}
              refreshToDos={populateTodos}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
