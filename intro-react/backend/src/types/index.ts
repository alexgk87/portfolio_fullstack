import type { ErrorCode } from "../lib/error";
import { z } from "zod";

export type ID = ReturnType<typeof crypto.randomUUID>;

export type Paginated = {
  offset: number;
  page: number;
  pages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type Data<T> = {
  success: true;
  data: T;
  pagination?: Paginated;
};

type Err = {
  code: ErrorCode;
  message: string;
};

export type Error = {
  success: false;
  error: Err;
};

export type Result<T> = Data<T> | Error;

export type ResultFn = {
  success: <T>(data: T, pagination?: Paginated) => Data<T>;
  failure: (error: unknown, code: ErrorCode) => Error;
};

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const projectSchema = z.object({
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

export const newProjectSchema = projectSchema.omit({ id: true }).extend({
  id: z.string().uuid().optional(),
});

export const projectsSchema = z.array(projectSchema);
