import { gql } from "apollo-boost";

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
