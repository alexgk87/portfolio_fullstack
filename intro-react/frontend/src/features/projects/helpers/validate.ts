import { z } from "zod";

const projectSchema = z.object({
  id: z.string().uuid().optional(),
  projectTitle: z.string().min(1, "Project title is required"),
  imageUrl: z.string().nullable().optional(),
  projectDescription: z.string().min(1, "Project description is required"),
  publishedAt: z.string().refine((value) => !isNaN(Date.parse(value)), {message: "Invalid date format",}).optional(),
  isPublic: z.union([z.boolean(), z.number().min(0).max(1)]),
  status: z.enum(["draft", "published"]),
  tags: z.preprocess((value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (e) {
          return [];
        }
      }
      return value;
    },
    z.array(z.string()).optional()
  ),
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, projectsSchema };