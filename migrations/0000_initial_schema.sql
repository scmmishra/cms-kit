-- The single table for all collection items --
CREATE TABLE IF NOT EXISTS "collections" (
  id TEXT PRIMARY KEY NOT NULL, -- Should be globally unique (e.g., UUID)
  collection_name TEXT NOT NULL, -- Name of the collection type (e.g., 'blog', 'featurePages')
  status TEXT NOT NULL DEFAULT 'draft', -- Common status for all collection items
  data JSON NOT NULL, -- Content of the item
  created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%d %H:%M:%f', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%d %H:%M:%f', 'now'))
);

CREATE TABLE IF NOT EXISTS "singletons" (
  id TEXT PRIMARY KEY NOT NULL,
  data JSON NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%d %H:%M:%f', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%d %H:%M:%f', 'now'))
);
