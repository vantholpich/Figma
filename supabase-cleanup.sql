-- Cleanup script - Run this to remove all tables and start fresh
-- Run this in your Supabase SQL Editor

-- Drop tables (CASCADE will remove all related data and constraints)
DROP TABLE IF EXISTS bids CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS people CASCADE;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_bids_count() CASCADE;

-- Done! Now you can run the complete setup script.
