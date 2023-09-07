import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import { Button, FormCheck } from "@govtechsg/sgds-react";

import CONFIG from "../config";
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
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    await axios.post(`${CONFIG.API_ENDPOINT}/todos/${id}/generate`);
    setIsLoading(false)
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
              disabled={isLoading}
            >
              {isLoading? "Loading..." : "Generate"}
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

export default TodoItem;
