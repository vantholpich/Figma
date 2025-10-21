# Quick Start Guide - Expo App

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Environment Variables

1. Copy the example env file:
   ```bash
   copy .env.example .env.local
   ```

2. Edit `.env.local` and add your Supabase credentials:
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### Step 3: Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL scripts in this order:
   - `supabase-schema.sql` (creates tables)
   - `supabase-complete-setup.sql` (adds sample data)

### Step 4: Run the App

```bash
npx expo start
```

Then:
- **On Phone**: Scan the QR code with Expo Go app
- **On Emulator**: Press `a` for Android or `i` for iOS
- **On Web**: Press `w` (for testing only)

## 📱 Install Expo Go

### iOS
Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)

### Android
Download from [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 🔧 Troubleshooting

### "Cannot connect to Metro"
- Make sure your phone and computer are on the same WiFi network
- Try running: `npx expo start --tunnel`

### "Supabase error"
- Check your `.env.local` file has correct credentials
- Restart the Expo server after changing env variables

### "Gesture handler not working"
- Make sure you ran `npm install`
- Try clearing cache: `npx expo start --clear`

## 📚 Next Steps

- Read `README-EXPO.md` for detailed documentation
- Check `CONVERSION-NOTES.md` to understand the conversion from web
- Customize the app to your needs!

## 🎯 Key Features to Test

1. **Swipe Cards**: Swipe left to skip, right to like
2. **Tap Card**: Tap any card to view full profile
3. **Place Bid**: View profile and place a bid
4. **My Bids**: Check your active bids
5. **Profile**: View your user profile

Enjoy building with Expo! 🎉
