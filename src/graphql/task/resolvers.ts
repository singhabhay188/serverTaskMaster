import { prisma } from "@/lib/prisma";
import { Status } from "@prisma/client";

const queries = {
  //_ = parent
  tasks: async (_: any) => {
    try {
      const tasks = await prisma.task.findMany({});
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  },

  taskById: async (_: any, { id }: { id: string }) => {
    try {
      const task = await prisma.task.findUnique({ where: { id } });
      if (!task) {
        throw new Error("Invalid Id. Task not found with given Id.");
      }
      return task;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to fetch task by id");
    }
  },
};

const mutations = {
  createTask: async (
    _: any,
    args: { title: string; description: string; dueDate?: string }
  ) => {
    try {
      const { title, description, dueDate } = args;

      let date: string | null = null;

      if (dueDate) {
        if (!isNaN(Date.parse(dueDate))) {
          const cdate = new Date(dueDate);
          cdate.setHours(23, 59, 59, 999);
          date = cdate.toISOString();
        } else {
          throw new Error("Invalid date format. Please provide a valid date");
        }
      }

      return await prisma.task.create({
        data: {
          title,
          description,
          dueDate: date,
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
    _: any,
    args: {
      id: string;
      title: string;
      description: string;
      status: string;
      dueDate?: string;
    }
  ) => {
    try {
      const { id, title, description, status, dueDate } = args;

      if (!status || !Object.values(Status).includes(status as Status)) {
        throw new Error("Invalid task status passed");
      }

      let date: string | null = null;

      if (dueDate) {
        if (!isNaN(Date.parse(dueDate))) {
          const cdate = new Date(dueDate);
          cdate.setHours(23, 59, 59, 999);
          date = cdate.toISOString();
        } else {
          throw new Error("Invalid date format. Please provide a valid date");
        }
      }

      const updateData = {
        title,
        description,
        status: status as Status,
        dueDate: date,
      };

      return await prisma.task.update({
        where: { id },
        data: updateData,
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
