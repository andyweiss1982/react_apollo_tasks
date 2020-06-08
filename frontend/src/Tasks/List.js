import React from "react";
import { useQuery } from "@apollo/react-hooks";
import Task from "./Task";
import { TASKS_QUERY } from "./graphql-queries";

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
