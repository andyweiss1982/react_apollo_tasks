import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Task from "./Task";

export const TASKS_QUERY = gql`
  query Tasks {
    tasks {
      id
      description
      completed
      dueDate
    }
  }
`;

const List = () => {
  const { data } = useQuery(TASKS_QUERY);
  const tasks = data?.tasks || [];
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} {...task} />
      ))}
    </ul>
  );
};

export default List;
