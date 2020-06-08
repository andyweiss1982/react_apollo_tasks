import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { TASKS_QUERY } from "./List";

const UPDATE_TASK_QUERY = gql`
  mutation UpdateTask($id: ID!) {
    updateTask(id: $id) {
      id
      description
      completed
      dueDate
    }
  }
`;

const DELETE_TASK_QUERY = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      description
      completed
      dueDate
    }
  }
`;

const Task = ({ id, description, completed, dueDate }) => {
  const [updateTask] = useMutation(UPDATE_TASK_QUERY);
  const [deleteTask] = useMutation(DELETE_TASK_QUERY);
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
