import Database from "better-sqlite3";

const db = new Database('./src/db/projects.db');

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

export default db;