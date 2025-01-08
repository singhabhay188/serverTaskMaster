import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

const queries = {
  tasks: async (parent: any, { id }: { id: string }) => {
    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: id,
        },
      });
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
    args: { title: string; description: string }
  ) => {
    try {
      let { title, description } = args;

      return await prisma.task.create({
        data: {
          title,
          description,
          userId: "safasdfsadfasdf",
        },
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
    args: { id: string; title?: string; description?: string; status?: string }
  ) => {
    try {
      const { id, title, description, status } = args;

      if (status && !Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid task status");
      }

      const updateData: {
        title?: string;
        description?: string;
        status?: Status;
      } = {};

      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (status) updateData.status = status as Status;

      if (Object.keys(updateData).length > 0) {
        return await prisma.task.update({
          where: { id },
          data: updateData,
        });
      } else {
        throw new Error("No valid fields provided to update");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error(
        error instanceof Error ? error.message : "Failed to update task"
      );
    }
  },

  deleteTask: async (parent: any, { id }: { id: string }) => {
    try {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) {
        return false;
      }

      await prisma.task.delete({ where: { id } });
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  },
};

export const resolvers = { queries, mutations };
