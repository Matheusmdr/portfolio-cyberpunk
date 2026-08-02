import { db } from "@portfolio/db";
import { contactMessages } from "@portfolio/db/schema/index";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

export const contactRouter = {
  send: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    )
    .handler(async ({ input }) => {
      const id = crypto.randomUUID();
      await db.insert(contactMessages).values({ id, ...input });
      return { success: true };
    }),
  list: protectedProcedure.handler(async () => {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }),
  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      await db.delete(contactMessages).where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
};
