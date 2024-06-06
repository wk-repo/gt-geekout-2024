import { Router } from 'express'
import {
  createTodo,
  getAllTodos,
  getTodosByDate,
  deleteTodoById,
  getTodoById,
  updateTodoById,
  createRandomTodo,
  //   generateTodoContent,
} from './methods'

const forwardRouter = Router()
forwardRouter.post('/todos', createTodo)
// forwardRouter.post("/todos/:id/generate", generateTodoContent);
forwardRouter.get('/todos', getAllTodos)
forwardRouter.get('/todos', getTodosByDate)
forwardRouter.get('/todos/:id', getTodoById)
forwardRouter.put('/todos/:id', updateTodoById)
forwardRouter.delete('/todos/:id', deleteTodoById)
forwardRouter.post('/todos/random', createRandomTodo)

export default forwardRouter
