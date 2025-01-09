export const mutation = `
    createTask(title: String!, description: String!, dueDate: String): Task
    updateTask(id: ID!, title: String!, description: String!, status: String!, dueDate: String): Task
    deleteTask(id: ID!): Boolean
`;
