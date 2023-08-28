import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { Container, Button, Form, FormCheck } from "@govtechsg/sgds-react";

import CONFIG from "../config";
import Table from "../components/Table";
import crossIcon from "../icons/cross.svg";

export type TodoItemProps = {
  id: string;
  description: string;
  content?: string;
  done: boolean;
  refreshToDos: () => void;
};

function TodoItem(props: TodoItemProps) {
  const [done, setDone] = useState(props.done);

  const updateTodoItem = useCallback(async () => {
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      done: done,
    });
  }, [props.description, props.id, done]);

  const deleteTodoItem = useCallback(async () => {
    await axios.delete(`${CONFIG.API_ENDPOINT}/todos/${props.id}`);
    props.refreshToDos();
  }, [props.id, props.refreshToDos]);

  const generateGptContent = useCallback(async (id: string) => {
    await axios.post(`${CONFIG.API_ENDPOINT}/todos/${id}/generate`);
    props.refreshToDos();
  }, []);

  useEffect(() => {
    /* mark the todo when done (as a dependency) changes */
    console.log(props.description, "is marked as ", done ? "done" : "undone");
    updateTodoItem();
  }, [props.description, done, updateTodoItem]);

  return (
    <>
      <tr>
        <td>
          <FormCheck
            onChange={(event) => setDone(event.currentTarget.checked)}
            checked={done}
          />
        </td>
        <td width={"100%"}>{props.description}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <Button
              size="sm"
              onClick={() => generateGptContent(props.id)}
              style={{ marginRight: 16 }}
            >
              Generate
            </Button>
            <img
              alt="delete-icon"
              src={crossIcon}
              onClick={deleteTodoItem}
              className="delete-icon"
            />
          </div>
        </td>
      </tr>
      {props.content && (
        <tr>
          <td/>
          <td>{props.content}</td>
          <td/>
        </tr>
      )}
    </>
  );
}

function Todo() {
  const [todoItems, setTodoItems] = useState<{ [id: string]: TodoItemProps }>(
    {}
  );
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  } as const;

  useEffect(() => {
    populateTodos();
  }, []);

  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`);
    setTodoItems(result.data);
  }, []);

  async function submitNewTodo() {
    setIsLoading(true);
    if (newTodoDescription.trim() !== "") {
      const newTodo = {
        description: newTodoDescription,
      };
      await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo);
      await populateTodos();
      setNewTodoDescription("");
    } else {
      alert("Invalid Todo input!");
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <div className="has-background-gradient">
        <h2>Today</h2>
        {today.toLocaleDateString("en-UK", dateOptions)}
      </div>
      <Form>
        <Table isFullwidth isHoverable isHorizontal isBordered>
          <thead>
            <tr>
              <th>Done</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(todoItems).map((item) => (
              <TodoItem
                key={todoItems[item].id}
                {...todoItems[item]}
                refreshToDos={populateTodos}
              />
            ))}
            <tr>
              <td>
                <FormCheck disabled />
              </td>
              <td width={"100%"}>
                <input
                  className="text table-input"
                  placeholder="Enter new to-do here"
                  id="newTodoDescription"
                  type="text"
                  value={newTodoDescription}
                  onChange={(event) => {
                    setNewTodoDescription(event.currentTarget.value);
                  }}
                ></input>
              </td>
              <td/>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button
        size="sm"
        variant="primary"
        onClick={submitNewTodo}
        disabled={isLoading}
      >
        {isLoading ? "loading..." : "Add"}
      </Button>
    </Container>
  );
}

export default Todo;
