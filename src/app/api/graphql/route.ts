import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/graphql/task";

// GraphQL schema
const typeDefs = `
  ${Task.types}

  type Query {
      ${Task.queries}
  }

  type Mutation {
      ${Task.mutation}
  }
`;

// Resolvers
const resolvers = {
  Query: {
    ...Task.resolvers.queries,
  },
  Mutation: {
    ...Task.resolvers.mutations,
  },
};

// Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create handler with proper Next.js 13+ API route support
const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});

// Wrapper function to add CORS headers
async function corsHandler(req: NextRequest) {
  const response = await handler(req);

  // Add CORS headers
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function GET(req: NextRequest) {
  return corsHandler(req);
}

export async function POST(req: NextRequest) {
  return corsHandler(req);
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
