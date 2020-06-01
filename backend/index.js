const { ApolloServer, gql } = require("apollo-server");
const { uuid } = require("uuidv4");

const tasks = [];

const typeDefs = gql`
  type Task {
    id: ID!
    description: String!
    completed: Boolean!
    dueDate: String
    createdAt: String!
  }
  type Query {
    tasks: [Task]!
  }
  type Mutation {
    createTask(description: String!, dueDate: String): Task!
    deleteTask(id: ID!): Task!
    updateTask(id: ID!): Task!
  }
`;

const resolvers = {
  Query: {
    tasks: () => tasks.sort((a, b) => b.createdAt - a.createdAt),
  },
  Mutation: {
    createTask: (_, { description, dueDate }) => {
      const task = {
        description,
        dueDate,
        completed: false,
        createdAt: Date.now(),
        id: uuid(),
      };
      tasks.unshift(task);
      return task;
    },
    deleteTask: (_, { id }) => {
      const task = tasks.find((task) => task.id === id);
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      return task;
    },
    updateTask: (_, { id }) => {
      const task = tasks.find((task) => task.id === id);
      task.completed = !task.completed;
      return task;
    },
  },
};

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(PORT).then(({ url }) => console.log(`Server running at ${url}`));
