import app from "./app";
import { port } from "./config/serverPort";
import { serve } from "@hono/node-server";

console.log("Server is running on http://localhost:" + port);

serve({
  fetch: app.fetch,
  port,
});