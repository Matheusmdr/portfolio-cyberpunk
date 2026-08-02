import { db } from "@portfolio/db";
import { siteSettings } from "@portfolio/db/schema/index";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

export const settingsRouter = {
  getAll: publicProcedure.handler(async () => {
    const settings = await db.select().from(siteSettings);
    return settings.reduce(
      (acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      },
      {} as Record<string, string>
    );
  }),
  update: protectedProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .handler(async ({ input }) => {
      await db
        .insert(siteSettings)
        .values(input)
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: input.value, updatedAt: new Date() },
        });
      return { success: true };
    }),
};
