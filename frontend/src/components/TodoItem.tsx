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
  // const [done, setDone] = useState(props.done); Checkpoint 2: To uncomment.

  const updateTodoItem = useCallback(async () => { // Checkpoint 2: How can we pass the `done` state to our endpoint?
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      done: false,
    });
  }, [props.description, props.id]);

  // Checkpoint 3: Implement a method like "updateTodoItem" to delete a TodoItem

  // Checkpoint 4: Implement a method like "updateTodoItem" to generate the ChatGPT content
  // Considering how long it takes to generate the content, how could using `setIsLoading` be helpful? 

  useEffect(() => { // Checkpoint 2: How can we call updateTodoItem() when done is modified?
    updateTodoItem();
  }, [props.description, updateTodoItem]);

  return (
    <>
      <tr>
        <td>
          <FormCheck
            // Checkpoint 2: Update the onChange and checked props using state
          />
        </td>
        <td width={"100%"}>{props.description}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <Button // Checkpoint 4: How should we use `isLoading` here?
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
