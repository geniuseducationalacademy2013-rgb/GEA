-- Genius Educational Academy - Database Schema
-- Run this in your Neon PostgreSQL database.

BEGIN;

CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_media (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  percentage VARCHAR(50),
  year VARCHAR(10),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_queries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_details VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  standard VARCHAR(50),
  board VARCHAR(100),
  query TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
);

COMMIT;
