import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { TASKS_QUERY } from "./graphql-queries";
import { CREATE_TASK_MUTATION } from "./graphql-mutations";

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
    createTask({ variables, refetchQueries: [{ query: TASKS_QUERY }] });
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
