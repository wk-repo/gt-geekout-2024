import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import CONFIG from '../config'
import TodoItem from '../components/TodoItem'
import checkIcon from '../icons/check.svg'

function Todo() {
  const [todoItems, setTodoItems] = useState({})
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const today = new Date()

  useEffect(() => {
    populateTodos()
  }, [])

  const formatDate = (today) => {
    return `${today.toLocaleDateString('en-UK', { weekday: 'long' })}, ${today.toLocaleDateString(
      'en-UK',
      {
        day: 'numeric',
        month: 'long',
      },
    )} 🌤️`
  }

  const populateTodos = async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`)
    console.log(result)
    setTodoItems(result.data)
  }

  const submitNewTodo = async () => {
    setIsLoading(true)
    if (newTodoDescription.trim() !== '') {
      const newTodo = {
        description: newTodoDescription,
      }
      try {
        await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo)
        await populateTodos()
        setNewTodoDescription('')
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
          checked={false}
          disabled={true}
          style={{ transform: 'scale(1.5)' }}
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
              completed={todo.completed}
              refreshToDos={populateTodos}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
