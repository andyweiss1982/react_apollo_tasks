import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($description: String!, $dueDate: String) {
    createTask(description: $description, dueDate: $dueDate) {
      id
      description
      completed
      dueDate
    }
  }
`;

const Form = () => {
  const emptyFormData = { description: "", dueDate: "" };
  const [formData, setFormData] = useState(emptyFormData);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = { ...formData };
    for (let key in variables) {
      if (!variables[key]) delete variables[key];
    }
    createTask({ variables, refetchQueries: ["Tasks"] });
    setFormData(emptyFormData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="description">Task</label>
        <input
          id="description"
          type="text"
          value={formData.description}
          required
          autoComplete="off"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="due-date">Due</label>
        <input
          id="due-date"
          type="date"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
        />
      </div>
    </form>
  );
};

export default Form;
