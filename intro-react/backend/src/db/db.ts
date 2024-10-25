import { env } from "../lib/env";
import { makeLogger } from "../lib/logger";
import Database from "better-sqlite3";

export const db = new Database(env.DATABASE_URL, {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

//const db = new Database('./src/db/projects.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    projectTitle TEXT,
    imageUrl TEXT,
    projectDescription TEXT,
    publishedAt TEXT,
    isPublic INTEGER NOT NULL,
    status TEXT CHECK(status IN ('draft', 'published')),
    tags TEXT,
    projectUrl TEXT
  );
`);

export type DB = typeof db;

export default db;