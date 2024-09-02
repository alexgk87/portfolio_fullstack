"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_server_1 = require("@hono/node-server");
var hono_1 = require("hono");
var cors_1 = require("hono/cors");
var serve_static_1 = require("@hono/node-server/serve-static");
var fs_1 = require("fs");
var path_1 = require("path");
var app = new hono_1.Hono();
app.use("/*", (0, cors_1.cors)());
app.use("/static/*", (0, serve_static_1.serveStatic)({ root: "./" }));
app.use("/img/*", (0, serve_static_1.serveStatic)({ root: "./" }));
app.use("/data/*", (0, serve_static_1.serveStatic)({ root: "./" }));
// Define a route for the root URL
app.get("/", function (index) {
    var html = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, "index.html"), "utf-8");
    return index.html(html);
});
var port = 3999;
console.log("Server is running on http://localhost:" + port);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: port,
});
