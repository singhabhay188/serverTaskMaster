import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import { Task } from "@/graphql/task";

const typeDefs = `
  ${Task.types}

  type Query {
      ${Task.queries}
  }

  type Mutation {
      ${Task.mutation}
  }
`;

const resolvers = {
  Query: {
    ...Task.resolvers.queries,
  },
  Mutation: {
    ...Task.resolvers.mutations,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
