import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { Container, Button } from '@govtechsg/sgds-react'
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

  // Mock data for Todo items
  const mockTodos: TodoItemProps[] = [
    {
      id: '1',
      description: 'Learn React',
      done: false,
      refreshToDos: () => console.log('Refresh'),
    },
    {
      id: '2',
      description: 'Read about Redux',
      done: true,
      refreshToDos: () => console.log('Refresh'),
    },
    {
      id: '3',
      description: 'Build a Todo App',
      done: false,
      refreshToDos: () => console.log('Refresh'),
    },
  ]

  const today = new Date()

  useEffect(() => {
    populateTodos()
  }, [])

  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`)
    setTodoItems(result.data)
  }, [])

  async function submitNewTodo() {
    setIsLoading(true)
    if (newTodoDescription.trim() !== '') {
      const newTodo = {
        description: newTodoDescription,
      }
      await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo)
      await populateTodos()
      setNewTodoDescription('')
    } else {
      alert('Invalid Todo input!')
    }
    setIsLoading(false)
  }

  return (
    <div className="todo-container">
      <div
        style={{
          marginTop: 32,
          width: '80%',
          maxWidth: '1000px',
        }}
      >
        <div
          style={{
            textAlign: 'left',
            marginBottom: 20,
          }}
        >
          <h1 style={{ padding: '10px 0px' }}>
            {today.toLocaleDateString('en-UK', { weekday: 'long' })},{' '}
            {today.toLocaleDateString('en-UK', {
              day: 'numeric',
              month: 'long',
            })}{' '}
            🌤️
          </h1>
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
          style={{ flexGrow: 1, width: 700, border: 'none' }}
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
              <img
                src={checkIcon}
                alt="Check"
                style={{ marginRight: 10, width: '18px' }}
              />
              Save Task
            </>
          )}
        </Button>
      </div>
      <div style={{ width: '80%', maxWidth: '1000px', marginTop: '25px' }}>
        {mockTodos.map((todo) => (
          <div style={{ marginBottom: '25px' }}>
            <TodoItem
              key={todo.id}
              id={todo.id}
              description={todo.description}
              done={todo.done}
              refreshToDos={todo.refreshToDos}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
