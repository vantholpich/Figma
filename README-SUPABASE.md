# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to https://supabase.com and sign up/login
2. Create a new project
3. Wait for the project to be provisioned

## 2. Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase-schema.sql` from this project
3. Paste and run the SQL to create tables and policies

## 3. Configure Environment Variables

1. In Supabase dashboard, go to Settings > API
2. Copy your Project URL and anon/public key
3. Update `.env.local` with your credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Seed Initial Data (Optional)

To populate your database with sample data:

1. Open your browser console in the running app
2. Run: `import('./utils/seedData').then(m => m.seedDatabase())`

Or create a temporary seed page/button in your app.

## 5. Database Structure

### Tables

- **people**: Stores person profiles being auctioned
- **testimonials**: Stores testimonials for each person
- **bids**: Stores bids placed by users

### Features Implemented

- Real-time data fetching from Supabase
- Custom React hooks for data management (`usePeople`, `useBids`)
- TypeScript types for type safety
- Row Level Security (RLS) policies
- Automatic bid count updates via triggers

## Next Steps

- Add authentication (Supabase Auth)
- Implement real-time subscriptions for live bid updates
- Add user profiles and authentication
- Implement image uploads to Supabase Storage
