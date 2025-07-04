-- ===================================================================
-- MIGRATION 1: INITIAL SCHEMA
-- File: database/migrations/001_initial_schema.sql
-- Description: Sets up basic database structure with extensions and enums
-- ===================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types (with error handling if already exists)
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'dosen', 'laboran', 'mahasiswa', 'dev_super');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'user_role enum already exists, skipping...';
END $$;

DO $$ BEGIN
    CREATE TYPE peminjaman_status AS ENUM ('pending', 'approved', 'rejected', 'returned', 'overdue');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'peminjaman_status enum already exists, skipping...';
END $$;

DO $$ BEGIN
    CREATE TYPE alat_condition AS ENUM ('baik', 'rusak_ringan', 'rusak_berat', 'maintenance', 'hilang');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'alat_condition enum already exists, skipping...';
END $$;

DO $$ BEGIN
    CREATE TYPE presensi_status AS ENUM ('hadir', 'izin', 'sakit', 'alfa');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'presensi_status enum already exists, skipping...';
END $$;

DO $$ BEGIN
    CREATE TYPE laporan_status AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'laporan_status enum already exists, skipping...';
END $$;

DO $$ BEGIN
    CREATE TYPE jadwal_status AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'jadwal_status enum already exists, skipping...';
END $$;

-- Create updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Grant basic permissions on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Success message
SELECT 'Initial schema with extensions and enums created successfully' as message;