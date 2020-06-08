import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { TASKS_QUERY } from "./graphql-queries";
import {
  UPDATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
} from "./graphql-mutations";

const Task = ({ id, description, completed, dueDate }) => {
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const today = new Date().toISOString().split("T")[0];
  return (
    <li>
      <span className="task">
        <span className={`description ${completed ? "completed" : ""}`}>
          {description}
        </span>
        <span
          className={`${
            dueDate ? `due-date ${today > dueDate ? "late" : ""}` : ""
          }`}
        >
          {dueDate &&
            "Due " + new Intl.DateTimeFormat().format(new Date(dueDate))}
        </span>
      </span>
      <span className="buttons">
        <button
          className="update"
          onClick={() => updateTask({ variables: { id } })}
        >
          {completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          className="delete"
          onClick={() => {
            if (confirm("Are you sure?")) {
              deleteTask({
                variables: { id },
                refetchQueries: [{ query: TASKS_QUERY }],
              });
            }
          }}
        >
          Delete
        </button>
      </span>
    </li>
  );
};

export default Task;
