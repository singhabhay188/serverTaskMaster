export const types = `
     enum Status {
          PENDING
          IN_PROGRESS
          COMPLETED
     }

     type Task {
          id: ID!
          title: String!
          description: String
          status: Status
          dueDate: String
     }
`;
