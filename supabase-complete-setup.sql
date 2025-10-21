-- Complete Supabase Setup for Friend Auction App
-- Run this entire script in your Supabase SQL Editor

-- ============================================
-- 1. CREATE TABLES
-- ============================================

-- People/Profiles table
CREATE TABLE people (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  bio TEXT NOT NULL,
  occupation TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  bids_count INTEGER DEFAULT 0,
  auctioned_by TEXT NOT NULL,
  about TEXT NOT NULL,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  avatar TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bids table
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES people(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE SECURITY POLICIES
-- ============================================

-- Policies for people (public read)
CREATE POLICY "Anyone can view people" ON people
  FOR SELECT USING (true);

-- Policies for testimonials (public read)
CREATE POLICY "Anyone can view testimonials" ON testimonials
  FOR SELECT USING (true);

-- Policies for bids (users can view their own bids)
CREATE POLICY "Users can view their own bids" ON bids
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create bids" ON bids
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 4. CREATE TRIGGER FOR BID COUNT
-- ============================================

-- Function to update bids_count
CREATE OR REPLACE FUNCTION update_bids_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE people
  SET bids_count = (
    SELECT COUNT(*) FROM bids WHERE person_id = NEW.person_id
  )
  WHERE id = NEW.person_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update bids_count
CREATE TRIGGER update_bids_count_trigger
AFTER INSERT ON bids
FOR EACH ROW
EXECUTE FUNCTION update_bids_count();

-- ============================================
-- 5. INSERT SAMPLE DATA
-- ============================================

-- Insert Ethan
INSERT INTO people (name, age, bio, occupation, image, gallery, bids_count, auctioned_by, about, pros, cons, interests)
VALUES (
  'Ethan',
  28,
  'Looking for someone who loves adventure and spontaneous trips.',
  'Software Engineer',
  'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODE4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ARRAY[
    'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODE4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ],
  124,
  'Sarah M.',
  'Ethan is a travel-loving software engineer with a passion for exploring new cultures and trying extreme sports. He''s the type of person who will book a last-minute flight to a new country and figure out the details later. When he''s not coding, you can find him rock climbing, surfing, or planning his next adventure. He''s looking for someone who shares his sense of wanderlust and isn''t afraid to step outside their comfort zone.',
  ARRAY['Great at cooking', 'Loves animals', 'Great sense of humor', 'Adventurous and spontaneous'],
  ARRAY['A bit of a spontaneous', 'Gets too competitive at board games', 'Always refers to wine'],
  ARRAY['Adventure', 'Travel', 'Coding', 'Rock Climbing']
);

-- Get Ethan's ID for testimonials
DO $$
DECLARE
  ethan_id UUID;
BEGIN
  SELECT id INTO ethan_id FROM people WHERE name = 'Ethan';
  
  INSERT INTO testimonials (person_id, name, text, avatar) VALUES
  (ethan_id, 'Alex M.', 'Ethan is the most genuine and adventurous person I know. His positive energy is infectious and he''ll make you laugh until your stomach hurts.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'),
  (ethan_id, 'Jessica R.', 'He''s a heart of gold. She''s an amazing friend and would be an even better partner.', 'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
END $$;

-- Insert Sophia
INSERT INTO people (name, age, bio, occupation, image, gallery, bids_count, auctioned_by, about, pros, cons, interests)
VALUES (
  'Sophia',
  27,
  'Creative soul who believes in authentic connections and deep conversations.',
  'Graphic Designer',
  'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ARRAY[
    'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ],
  89,
  'Marcus L.',
  'Sophia is a creative soul who loves authentic adventures and meaningful connections, as well as watching new cultures. She''s a talented graphic designer with a keen eye for aesthetics and a heart full of wanderlust. She describes her style as joyful, and she fills her free time with new adventures.',
  ARRAY['Loyal and trustworthy', 'Great cook', 'Great sense of humor', 'Adventurous and spontaneous'],
  ARRAY['A bit of a perfectionist', 'Gets too competitive at board games', 'Always afraid of spiders'],
  ARRAY['Photography', 'Yoga', 'Shared Dinners', 'Reading']
);

-- Get Sophia's ID for testimonials
DO $$
DECLARE
  sophia_id UUID;
BEGIN
  SELECT id INTO sophia_id FROM people WHERE name = 'Sophia';
  
  INSERT INTO testimonials (person_id, name, text, avatar) VALUES
  (sophia_id, 'Maya K.', 'Sophia is the most loyal generous and thoughtful friend around. She''ll make you feel so welcome on our first dinner.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
END $$;

-- Insert Marcus
INSERT INTO people (name, age, bio, occupation, image, gallery, bids_count, auctioned_by, about, pros, cons, interests)
VALUES (
  'Marcus',
  26,
  'Fitness enthusiast who loves cooking and weekend camping trips.',
  'Personal Trainer',
  'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ARRAY[
    'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ],
  76,
  'Emma T.',
  'Marcus is passionate about health and wellness, always encouraging others to be their best selves. He loves spending time outdoors and is an amazing cook who''ll make you the perfect post-workout meal.',
  ARRAY['Extremely motivated', 'Great listener', 'Amazing cook', 'Loves the outdoors'],
  ARRAY['Can be too health-focused', 'Wakes up very early', 'Talks about fitness a lot'],
  ARRAY['Fitness', 'Cooking', 'Hiking', 'Meditation']
);

-- Get Marcus's ID for testimonials
DO $$
DECLARE
  marcus_id UUID;
BEGIN
  SELECT id INTO marcus_id FROM people WHERE name = 'Marcus';
  
  INSERT INTO testimonials (person_id, name, text, avatar) VALUES
  (marcus_id, 'David L.', 'Marcus is the most supportive and motivating person I know. He genuinely cares about everyone around him.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
END $$;

-- ============================================
-- DONE! Your database is ready to use.
-- ============================================
