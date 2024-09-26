import { Hono } from "hono";
import { cors } from "hono/cors";
import { existingProjects } from "../../shared/portfolio";

const app = new Hono();

app.use("/*", cors({origin: 'http://localhost:5173'}));


app.get("/projects", async (c) => {
  return c.json({
    data: existingProjects,
  });
});

export default app;