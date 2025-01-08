export const types = `
     type User {
          id: ID!
          name: String!
          email: String!
          password: String!
          tasks: [Task]
     }

     input CreateUserInput {
          name: String!
          email: String!
          password: String!
     }

     input LoginUserInput {
          email: String!
          password: String!
     }`;
