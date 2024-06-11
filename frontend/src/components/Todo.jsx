import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '@govtechsg/sgds-react'
import CONFIG from '../config'
import TodoItem from './TodoItem'
import TodoHeader from './TodoHeader'
import checkIcon from '../icons/check.svg'

function Todo() {
  const [todoItems, setTodoItems] = useState({})
  const [newTodoDescription, setNewTodoDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTooLong, setIsTooLong] = useState(false)

  useEffect(() => {
    populateTodos()
  }, [])

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

  useEffect(() => {
    if (newTodoDescription.length >= 30) {
      setIsTooLong(true)
    } else {
      setIsTooLong(false)
    }
  }, [newTodoDescription])

  return (
    <div className="todo-container">
      <TodoHeader />
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
          onChange={(e) => {
            if (e.target.value.length <= 30) {
              setNewTodoDescription(e.target.value)
            }
          }}
          placeholder="✏️ Have a new to-do? Write it down! "
        />
        <Button
          onClick={submitNewTodo}
          disabled={isLoading || isTooLong}
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
