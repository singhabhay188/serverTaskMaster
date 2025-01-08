export const mutation = `
    createTask(title: String!, description: String!): Task
    updateTask(id: ID!, title: String, description: String, status: String): Task
    deleteTask(id: ID!): Boolean
`;
