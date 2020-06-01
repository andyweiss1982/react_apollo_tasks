import React from "react";
import List from "./List";
import Form from "./Form";

const Tasks = () => (
  <>
    <header>
      <h1>Tasks</h1>
    </header>
    <main>
      <Form />
      <List />
    </main>
  </>
);

export default Tasks;
