import { Hono } from "hono";
import { cors } from "hono/cors";
import { DB, db } from './db/db';
import { Logger } from "./lib/logger";
import { ServerEnv } from "./lib/env";
import { z } from "zod";
import { projectSchema, newProjectSchema } from "./types";

const app = new Hono<HonoEnv>();

type User = {
  username: string;
  email: string;
}

type ContextVariables = {
  user: User | null; 
}

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  } & ContextVariables;
};

app.use("/*", cors({origin: 'http://localhost:5173'}));

app.get('/projects', (c) => {
  const projects = db.prepare('SELECT * FROM projects').all();
  return c.json({ data: projects });
});

app.get('/projects/:id', (c) => {
  const { id } = c.req.param();
  const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(id);

  if (!project) {
    return c.json({ error: 'Project not found' }, 404);
  }

  return c.json({ data: project });
});

app.put("/projects/:id", async (c) => {
  const { id } = c.req.param();
  const projectData = await c.req.json();

  const { projectTitle, imageUrl, projectDescription, publishedAt, isPublic, status, tags, projectUrl } = projectData;
  const isPublicValue = isPublic ? 1 : 0;

  if (!projectTitle || !projectDescription) {
    return c.json({ error: 'Title and description are required' }, 400);
  }

  if (status !== "draft" && status !== "published") {
    return c.json({ error: 'Invalid status' }, 400);
  }

  if (tags && !Array.isArray(tags)) {
    return c.json({ error: 'Tags must be an array' }, 400);
  }

  try {
    const query = `
      UPDATE projects
      SET projectTitle = ?, imageUrl = ?, projectDescription = ?, publishedAt = ?, isPublic = ?, status = ?, tags = ?, projectUrl = ?
      WHERE id = ?
    `;

    const values = [
      projectTitle,
      imageUrl,
      projectDescription,
      publishedAt ?? null,
      isPublicValue,
      status,
      JSON.stringify(tags),
      projectUrl,
      id
    ];

    const result = db.prepare(query).run(values);

    if (result.changes === 0) {
      return c.json({ error: 'Project not found or no changes made' }, 404);
    }

    return c.json({ message: "Project updated successfully" }, 200);
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json({ error: "Failed to update project" }, 500);
  }
});

app.post("/projects", async (c) => {
  try {
    const projectData = await c.req.json();
    
    const validation = newProjectSchema.safeParse(projectData);
    if (!validation.success) {
      return c.json({ error: validation.error.errors.map(e => e.message) }, 400);
    }
    
    const { id, projectTitle, imageUrl, projectDescription, publishedAt, isPublic, status, tags, projectUrl } = validation.data;
    const isPublicValue = isPublic ? 1 : 0;
    
    const query = `
      INSERT INTO projects (id, projectTitle, imageUrl, projectDescription, publishedAt, isPublic, status, tags, projectUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      id ?? null, 
      projectTitle, 
      imageUrl, 
      projectDescription, 
      publishedAt ?? null,
      isPublicValue, 
      status, 
      JSON.stringify(tags),
      projectUrl
    ];
    
    db.prepare(query).run(values);
    return c.json({
      id,
      projectTitle,
      imageUrl,
      projectDescription,
      publishedAt: publishedAt ?? null,
      isPublic, 
      status,
      tags,
      projectUrl
    }, 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return c.json({ error: "Failed to create project" }, 500);
  }
});

/*app.post("/projects", async (c) => {
  const project = await c.req.json();

  const { id, projectTitle, imageUrl, projectDescription, publishedAt, isPublic, status, tags, projectUrl } = project;
  const isPublicValue = isPublic ? 1 : 0;

  if (!projectTitle || !projectDescription) {
    return c.json({ error: 'Title and description are required' }, 400);
  }

  if (status !== "draft" && status !== "published") {
    return c.json({ error: 'Invalid status' }, 400);
  }

  if (tags && !Array.isArray(tags)) {
    return c.json({ error: 'Tags must be an array' }, 400);
  }


  try {
    const query = `
      INSERT INTO projects (id, projectTitle, imageUrl, projectDescription, publishedAt, isPublic, status, tags, projectUrl)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      id, 
      projectTitle, 
      imageUrl, 
      projectDescription, 
      publishedAt ?? null,
      isPublicValue, 
      status, 
      JSON.stringify(tags),
      projectUrl
    ];

    db.prepare(query).run(values);
    return c.json({
      id,
      projectTitle,
      imageUrl,
      projectDescription,
      publishedAt: publishedAt ?? null,
      isPublic, 
      status,
      tags,
      projectUrl
    }, 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return c.json({ error: "Failed to create project" }, 500);
  }
});*/

app.delete("/projects/:id", (c) => {
  const { id } = c.req.param();

  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);

  if (result.changes === 0) {
    return c.json({ error: 'Project not found' }, 404);
  }

  return c.json(undefined, 204);
});

export default app;