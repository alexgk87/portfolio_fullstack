import { Hono } from "hono";
import { cors } from "hono/cors";
import db from './db/db';

const app = new Hono();

app.use("/*", cors({origin: 'http://localhost:5173'}));

app.get('/projects', (c) => {
  const projects = db.prepare('SELECT * FROM projects').all();
  return c.json({ data: projects });
});

app.post("/projects", async (c) => {
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
});

app.delete("/projects/:id", (c) => {
  const { id } = c.req.param();

  const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);

  if (result.changes === 0) {
    return c.json({ error: 'Project not found' }, 404);
  }

  return c.json(undefined, 204);
});

export default app;