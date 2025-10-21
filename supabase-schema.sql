-- Create tables for Friend Auction App

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

-- Enable Row Level Security
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;

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
