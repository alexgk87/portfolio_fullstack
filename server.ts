import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFileSync } from "fs";
import { join } from "path";

const app = new Hono();

app.use("/*", cors());
app.use("/static/*", serveStatic({ root: "./" }));

// Define a route for the root URL
app.get("/", (index) => {
  const html = readFileSync(join(__dirname, "index.html"), "utf-8");
  return index.html(html);
});

const port = 3999;

console.log("Server is running on http://localhost:" + port);

serve({
  fetch: app.fetch,
  port,
});