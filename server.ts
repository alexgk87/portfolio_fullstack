import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFileSync, renameSync, writeFileSync } from "fs";
import { join } from "path";

const app = new Hono();

app.use("/*", cors());

app.use("/static/*", serveStatic({ root: "./" }));
app.use("/img/*", serveStatic({ root: "./" }));
app.use("/data/*", serveStatic({ root: "./" }));


// Root URL GET
app.get("/", (index) => {
  const html = readFileSync(join(__dirname, "index.html"), "utf-8");
  return index.html(html);
});

// New project subpage GET
app.get("/new-project", (newProject) => {
  const html = readFileSync(join(__dirname, "new-project.html"), "utf-8");
  return newProject.html(html);
});

// New project subpage POST
app.post('/submit-project', async (c) => {
  try {
    const newProject = await c.req.json();
    
    const projectPath = join(__dirname, './data/portfolioItems.json');
    const projectData = JSON.parse(readFileSync(projectPath, 'utf-8'));

    projectData.push(newProject);

    writeFileSync(projectPath, JSON.stringify(projectData, null, 2), 'utf-8');

    return c.json({ message: 'Project added successfully' }, 200);
  } catch (error) {
    console.error('Error updating portfolioItems.json:', error);
    return c.json({ message: 'Failed to add project' }, 500);
  }
});

const port = 3999;

console.log("Server is running on http://localhost:" + port);

serve({
  fetch: app.fetch,
  port,
});