-- ============================================
-- LanCraft - Redakční systém
-- SQL Setup pro Supabase
-- ============================================

-- 1. Vytvoření tabulky projects
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  thumbnail_image VARCHAR(500),
  article_image VARCHAR(500),
  preview_text TEXT,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Nastavit Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Odstranit staré politiky (pokud existují)
DROP POLICY IF EXISTS "Allow public to read projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated to insert projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated to update projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated to delete projects" ON projects;

-- 4. Vytvořit nové politiky
-- Veřejný přístup k čtení
CREATE POLICY "Allow public to read projects" ON projects
  FOR SELECT USING (true);

-- Grant oprávnění
GRANT SELECT ON projects TO anon, authenticated;

-- ============================================
-- ✅ Setup je hotov!
-- Tabulka "projects" je vytvořená a připravená.
-- ============================================