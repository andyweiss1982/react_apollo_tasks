import { gql } from "apollo-boost";

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($description: String!, $dueDate: String) {
    createTask(description: $description, dueDate: $dueDate) {
      id
      description
      completed
      dueDate
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!) {
    updateTask(id: $id) {
      id
      description
      completed
      dueDate
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      description
      completed
      dueDate
    }
  }
`;
