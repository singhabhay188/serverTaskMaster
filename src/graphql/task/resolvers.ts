import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";
var jwt = require("jsonwebtoken");

const queries = {
  tasks: async () => {
    try {
      const tasks = await prisma.task.findMany();
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  },
};

const mutations = {
  createTask: async (
    parent: any,
    args: { title: string; description: string; status: string }
  ) => {
    try {
      const { title, description, status } = args;
      if (!Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid task status");
      }
      return await prisma.task.create({
        data: { title, description, status: status as Status, userId: "a" },
      });
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to create task"
      );
    }
  },

  updateTask: async (
    parent: any,
    args: { id: string; title: string; description: string; status: string }
  ) => {
    try {
      const { id, title, description, status } = args;
      if (!Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid task status");
      }
      return await prisma.task.update({
        where: { id },
        data: { title, description, status: status as Status },
      });
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update task"
      );
    }
  },

  deleteTask: async (parent: any, { id }: { id: string }) => {
    try {
      await prisma.task.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task");
    }
  },
};

export const resolvers = { queries, mutations };
