import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";

import createContext from "@/graphql/context";
import { User } from "@/graphql/user";
import { Task } from "@/graphql/task";

const typeDefs = `
  ${User.types}
  ${Task.types}

  type Query {
      ${User.queries}
      ${Task.queries}
  }

  type Mutation {
      ${User.mutation}
      ${Task.mutation}
  }
`;

const resolvers = {
  Query: {
    ...User.resolvers.queries,
    ...Task.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
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
