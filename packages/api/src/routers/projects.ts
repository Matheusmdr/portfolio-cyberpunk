import { ORPCError } from "@orpc/server";
import { db } from "@portfolio/db";
import { projects } from "@portfolio/db/schema/index";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure, publicProcedure } from "../index";

export const projectsRouter = {
  list: publicProcedure.handler(async () => {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(desc(projects.sortOrder), desc(projects.createdAt));
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .handler(async ({ input }) => {
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.slug, input.slug))
        .limit(1);
      if (!project) throw new ORPCError("NOT_FOUND", { message: "Project not found" });
      return project;
    }),
  listAll: protectedProcedure.handler(async () => {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        longDescription: z.string().optional().nullable(),
        coverImage: z.string().optional().nullable(),
        liveUrl: z.string().optional().nullable(),
        repoUrl: z.string().optional().nullable(),
        techStack: z.array(z.string()).optional().nullable(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
        status: z.enum(["draft", "published"]).optional(),
      })
    )
    .handler(async ({ input }) => {
      const id = crypto.randomUUID();
      const [newProject] = await db.insert(projects).values({
        id,
        ...input,
        techStack: input.techStack || [],
      }).returning();
      return newProject;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        longDescription: z.string().optional().nullable(),
        coverImage: z.string().optional().nullable(),
        liveUrl: z.string().optional().nullable(),
        repoUrl: z.string().optional().nullable(),
        techStack: z.array(z.string()).optional().nullable(),
        featured: z.boolean().optional(),
        sortOrder: z.number().optional(),
        status: z.enum(["draft", "published"]).optional(),
      })
    )
    .handler(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await db
        .update(projects)
        .set({
          ...data,
          techStack: data.techStack === undefined ? undefined : (data.techStack || []),
        })
        .where(eq(projects.id, id))
        .returning();
      return updated;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      await db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
};
