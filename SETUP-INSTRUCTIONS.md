# Complete Setup Instructions

## Prerequisites Check

Before starting, make sure you have:

- [ ] Node.js 18 or higher installed
- [ ] npm or yarn package manager
- [ ] A Supabase account (free tier works)
- [ ] Expo Go app on your phone (optional but recommended)

## Step-by-Step Setup

### 1. Install Node.js Dependencies

First, you need to decide which version to use:

**Option A: Use the Expo version (Recommended for mobile)**
```bash
# Rename the Expo package.json
move package-expo.json package.json

# Install dependencies
npm install
```

**Option B: Keep the web version**
```bash
# Use the existing package.json for web development
npm install
```

### 2. Configure Environment Variables

1. Create your environment file:
   ```bash
   copy .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project (or use existing)
   - Go to Project Settings > API
   - Copy the **Project URL** and **anon/public key**

3. Update `.env.local`:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Set Up Supabase Database

1. Open your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the contents of `supabase-schema.sql`
5. Click "Run" to create the tables
6. Create another new query
7. Copy and paste the contents of `supabase-complete-setup.sql`
8. Click "Run" to add sample data

### 4. Verify Database Setup

In Supabase, go to "Table Editor" and verify you see:
- `people` table with sample profiles
- `testimonials` table with sample testimonials
- `bids` table (empty initially)

### 5. Run the Application

For Expo (mobile):
```bash
npx expo start
```

Then:
- Scan QR code with Expo Go app (Camera on iOS, Expo Go on Android)
- Or press `a` for Android emulator
- Or press `i` for iOS simulator

For Web (original version):
```bash
npm run dev
```

Then open http://localhost:3000 in your browser

## Verification Checklist

After setup, verify everything works:

- [ ] App starts without errors
- [ ] You see auction cards with profile images
- [ ] You can swipe cards left/right
- [ ] Tapping a card shows the full profile
- [ ] Bottom navigation switches between views
- [ ] "My Bids" view loads (may be empty)
- [ ] "Profile" view shows user profile

## Common Issues and Solutions

### Issue: "Cannot find module 'expo'"
**Solution**: Make sure you renamed `package-expo.json` to `package.json` and ran `npm install`

### Issue: "Missing Supabase environment variables"
**Solution**: 
- Check `.env.local` file exists in the root directory
- Verify the variable names start with `EXPO_PUBLIC_`
- Restart the Expo server after changing env variables

### Issue: "No data showing in the app"
**Solution**:
- Verify you ran both SQL scripts in Supabase
- Check the Supabase Table Editor to confirm data exists
- Check browser/app console for error messages

### Issue: "Cannot connect to Metro bundler"
**Solution**:
- Make sure your phone and computer are on the same WiFi
- Try running: `npx expo start --tunnel`
- Or use an emulator instead

### Issue: "Gesture handler not working"
**Solution**:
- Clear cache: `npx expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Issue: Images not loading
**Solution**:
- Check your internet connection
- Verify the image URLs in Supabase are valid
- Check if you have any firewall/proxy blocking image requests

## Project Structure Overview

```
friend-auction-app/
├── app/                      # Expo Router pages (mobile)
│   ├── _layout.tsx          # Root layout
│   ├── index.tsx            # Home screen
│   └── profile/[id].tsx     # Profile detail
├── components/              # React Native components
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities (Supabase client)
├── types/                   # TypeScript types
├── src/                     # Original web app (if kept)
├── .env.local              # Your environment variables (create this)
├── .env.example            # Template for env variables
├── app.json                # Expo configuration
├── package-expo.json       # Expo dependencies
├── package.json            # Current dependencies
└── README-EXPO.md          # Detailed Expo documentation
```

## Next Steps

1. **Customize the app**: Edit components to match your design
2. **Add authentication**: Implement Supabase Auth
3. **Deploy**: Use EAS Build for production apps
4. **Test**: Test on both iOS and Android devices

## Getting Help

- **Expo Issues**: Check [Expo Documentation](https://docs.expo.dev/)
- **React Native**: Check [React Native Docs](https://reactnative.dev/)
- **Supabase**: Check [Supabase Docs](https://supabase.com/docs)
- **NativeWind**: Check [NativeWind Docs](https://www.nativewind.dev/)

## Development Tips

1. **Hot Reload**: Changes auto-reload in Expo Go
2. **Debug Menu**: Shake your device to open debug menu
3. **Console Logs**: View logs in the terminal where you ran `expo start`
4. **Element Inspector**: Press `m` in terminal to toggle element inspector

Happy coding! 🚀
