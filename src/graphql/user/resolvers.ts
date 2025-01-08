import { prisma } from "@/lib/prisma";
var jwt = require("jsonwebtoken");

const queries = {
  async verifyUser(parent: any, { token }: { token: string }) {
    try {
      if (!token) throw new Error("No token provided");

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      if (!decoded?.userId) throw new Error("Invalid token");

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      console.log("Error occurred while verifying user: ", error);

      if (error instanceof Error) {
        if (error.message === "No token provided") {
          throw new Error("No token provided");
        } else if (error.message === "Invalid token") {
          throw new Error("Invalid token");
        } else if (error.message === "User not found") {
          throw new Error("User not found");
        }
      }
      throw new Error("Failed to verify user");
    }
  },

  async getUser(parent: any, { id }: { id: string }) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      console.log("Error occured while fetching user: ", error);
      throw new Error("Failed to fetch user");
    }
  },
};

const mutations = {
  async createUser(
    parent: any,
    { input }: { input: { email: string; password: string; name: string } }
  ) {
    try {
      const { email, password, name } = input;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("User already exists");
      }

      const user = await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      return {
        ...user,
        token,
      };
    } catch (error) {
      console.log("Error occurred while creating user: ", error);
      throw error;
    }
  },

  async loginUser(
    parent: any,
    { input }: { input: { email: string; password: string } }
  ) {
    try {
      const { email, password } = input;

      const user = await prisma.user.findFirst({
        where: {
          email,
          password, // Note: In production, password comparison should be handled differently
        },
      });

      if (!user) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
      return {
        ...user,
        token,
      };
    } catch (error) {
      console.log("Error occurred while logging in user: ", error);
      throw error;
    }
  },
};

export const resolvers = { queries, mutations };
