import { z } from "zod";

const projectSchema = z.object({
  id: z.string().uuid(),
  projectTitle: z.string().min(1, "Project title is required"),
  imageUrl: z.string(),
  projectDescription: z.string().min(1, "Project description is required"),
  publishedAt: z.string().nullable().optional(),
  isPublic: z.boolean(),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string()),
  projectUrl: z.string(),
});

const newProjectSchema = projectSchema.omit({ id: true }).extend({
  id: z.string().uuid().optional(),
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, newProjectSchema, projectsSchema };