import { Request, Response } from 'express'
import { v4 } from 'uuid'
import { Todo } from 'types/Todo'
// import { generateContent } from "../logic/prompt"
import fetch from 'node-fetch'

// This is not exported, which means only methods exposed in this file will access it.
const todoList: { [id: string]: Todo } = {}

// Option 1 - wrapper for arbitrary messages
function messageJson(message: string) {
  return { message }
}

// Option 2 - enumerate the messages
const ERROR_MSGS = {
  NO_SUCH_UUID: { message: 'UUID does not exist' },
  TASK_REQUIRED: { message: 'Input task required' },
  UUID_MISMATCH: { message: 'UUID in path and body do not match' },
}

// Option 3 - Encapsulate the response entirely
function badRequest(res: Response, message: string) {
  return res.status(400).json({ message })
}

export async function createTodo(req: Request, res: Response) {
  const body = req.body
  if (!('description' in body)) {
    return res.status(400).json({ message: 'Input task required' })
  }
  let doneValue = false
  if ('done' in body) {
    doneValue = body.done === true || body.done === 'true' // Explicitly handle boolean and string representations
  }
  console.log(body)
  const newTodoTitle = body.description
  const newTodo = {
    id: v4(),
    description: newTodoTitle,
    content: '',
    done: doneValue,
    date: (body.date ||= new Date()),
  }
  todoList[newTodo.id] = newTodo
  return res.status(200).json(newTodo)
}

// export async function generateTodoContent(req: Request, res: Response) {
//   const { id } = req.params
//   if (!(id in todoList)) {
//     return badRequest(res, 'UUID does not exist')
//   }
//   const todo = todoList[id]
//   const generatedText = await generateContent(todo.description)
//   if (generatedText) {
//     todo.content = generatedText
//     todoList[todo.id] = todo
//     return res.status(200).json(todo)
//   } else {
//     return res
//       .status(500)
//       .json({ error: 'An error occurred while generating content' })
//   }
// }

// Can mention unused request param
export async function getAllTodos(_req: Request, res: Response) {
  return res.status(200).json(todoList)
}

export async function getTodosByDate(req: Request, res: Response) {
  const date = (req.body.date ||= new Date())
  const todoArrays = Object.entries(todoList)
  const todos = Object.entries(
    todoArrays.filter(([_, toDo]) => {
      toDo.date === date
    })
  )
  return res.status(200).json(todos)
}

export async function deleteTodoById(req: Request, res: Response) {
  const { id } = req.params
  if (id in todoList) {
    const entryToDelete = todoList[id]
    if (entryToDelete.description === 'Improve backend') {
      return res.status(405).json(messageJson('This todo cannot be deleted'))
    } else {
      delete todoList[id]
      return res.status(200).json()
    }
  } else {
    return res.status(400).json(ERROR_MSGS.NO_SUCH_UUID)
  }
}

export async function updateTodoById(req: Request, res: Response) {
  const { id } = req.params
  const updatedTodo = req.body
  if (id in todoList) {
    todoList[id] = { ...todoList[id], ...updatedTodo }
    return res.status(200).send()
  } else {
    return res.status(400).json(messageJson('UUID does not exist'))
  }
}

export async function getTodoById(req: Request, res: Response) {
  const { id } = req.params
  if (id in todoList) {
    return res.status(200).json(todoList[id])
  } else {
    return badRequest(res, 'UUID does not exist')
  }
}

export async function createRandomTodo(req: Request, res: Response) {
  const abortController = new AbortController()
  setTimeout(() => abortController.abort(), 3000)

  try {
    const responseJson = await fetch(
      'http://www.boredapi.com/api/activity'
    ).then((apiResponse) => apiResponse.json())
    const randomActivity = responseJson['activity']
    const randomTodo = {
      id: v4(),
      description: randomActivity,
      content: '',
      done: false,
      date: (req.body.date ||= new Date()),
    }
    todoList[randomTodo.id] = randomTodo
    return res.status(200).json(randomTodo)
  } catch (e) {
    // AbortError not exported in node-fetch V2
    const errorMessage = messageJson('Request from external api timed out')
    return res.status(500).json(errorMessage)
  }
}
