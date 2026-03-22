import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};

// Named export for convenience
export const query = db.query;

// Database schema initialization
export async function initDatabase() {
  // Activities table with sort_order
  await db.query(`
    CREATE TABLE IF NOT EXISTS activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Activity media with sort_order
  await db.query(`
    CREATE TABLE IF NOT EXISTS activity_media (
      id SERIAL PRIMARY KEY,
      activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
      type VARCHAR(50) NOT NULL,
      url TEXT NOT NULL,
      thumbnail_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Results table
  await db.query(`
    CREATE TABLE IF NOT EXISTS results (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      percentage VARCHAR(50),
      year VARCHAR(10),
      description TEXT,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Result images with sort_order
  await db.query(`
    CREATE TABLE IF NOT EXISTS result_images (
      id SERIAL PRIMARY KEY,
      result_id INTEGER REFERENCES results(id) ON DELETE CASCADE,
      url TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Gallery with sort_order
  await db.query(`
    CREATE TABLE IF NOT EXISTS gallery (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      url TEXT NOT NULL,
      thumbnail TEXT,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Student feedback with sort_order
  await db.query(`
    CREATE TABLE IF NOT EXISTS student_feedback (
      id SERIAL PRIMARY KEY,
      student_name VARCHAR(255) NOT NULL,
      feedback TEXT NOT NULL,
      media_type VARCHAR(50) NOT NULL,
      media_url TEXT NOT NULL,
      thumbnail_url TEXT,
      sort_order INTEGER DEFAULT 0
    )
  `);

  // Quick needs
  await db.query(`
    CREATE TABLE IF NOT EXISTS quick_needs (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) NOT NULL,
      content TEXT,
      media_url TEXT,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS contact_queries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact_details VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      standard VARCHAR(50),
      board VARCHAR(100),
      query TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS admissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      contact_details VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      standard VARCHAR(50),
      board VARCHAR(100),
      location VARCHAR(255),
      school_name VARCHAR(255),
      last_year_percentage VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add sort_order columns if they don't exist (for existing tables)
  await db.query(`ALTER TABLE activities ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0`);
  await db.query(`ALTER TABLE activity_media ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0`);
}

export default pool;
