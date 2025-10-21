# Friend Auction App - Expo React Native

This is the Expo React Native version of the Friend Auction App, converted from the original web application.

## Features

- 🎯 Swipeable auction cards with gesture animations
- 📱 Native mobile experience with React Native
- 🎨 Styled with NativeWind (Tailwind CSS for React Native)
- 🔄 Real-time data with Supabase
- 📊 Profile views with detailed information
- 💰 Bid tracking and management

## Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- Expo Go app on your mobile device (iOS or Android)
- Supabase account and project

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials:
     ```
     EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
     EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Set up Supabase database:**
   - Run the SQL scripts in your Supabase SQL editor:
     - `supabase-schema.sql` - Creates the database schema
     - `supabase-complete-setup.sql` - Adds sample data

## Running the App

### Development Mode

Start the Expo development server:

```bash
npx expo start
```

This will open the Expo DevTools in your browser. You can then:

- **Scan the QR code** with the Expo Go app (Android) or Camera app (iOS)
- Press **`a`** to open in Android emulator
- Press **`i`** to open in iOS simulator
- Press **`w`** to open in web browser

### Platform-Specific Commands

```bash
# Android
npx expo start --android

# iOS
npx expo start --ios

# Web
npx expo start --web
```

## Project Structure

```
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── profile/[id].tsx   # Profile detail screen
├── components/            # React Native components
│   ├── AuctionCard.tsx
│   ├── AuctionsView.tsx
│   ├── BottomNavigation.tsx
│   ├── MyBidsView.tsx
│   ├── ProfileView.tsx
│   ├── SwipeButtons.tsx
│   └── UserProfileView.tsx
├── hooks/                 # Custom React hooks
│   ├── useBids.ts
│   └── usePeople.ts
├── lib/                   # Utilities and configs
│   ├── database.types.ts
│   └── supabase.ts
├── types/                 # TypeScript types
│   └── index.ts
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── metro.config.js       # Metro bundler config
├── tailwind.config.js    # Tailwind CSS config
└── global.css            # Global styles
```

## Key Differences from Web Version

### Dependencies Replaced

- **Vite** → **Expo**
- **React Router** → **Expo Router**
- **Radix UI** → **React Native components**
- **Tailwind CSS** → **NativeWind**
- **Framer Motion** → **React Native Reanimated**
- **lucide-react** → **lucide-react-native**

### Component Changes

- All `<div>` elements replaced with `<View>`
- All `<span>` and `<p>` elements replaced with `<Text>`
- All `<button>` elements replaced with `<Pressable>`
- All `<img>` elements replaced with `<Image>` from React Native
- CSS classes work with NativeWind (Tailwind for React Native)

### Animations

- Swipe gestures use React Native Reanimated and Gesture Handler
- Smooth native animations for card swiping
- Native touch feedback on all interactive elements

## Building for Production

### Android

```bash
# Build APK
npx expo build:android

# Or use EAS Build (recommended)
npx eas build --platform android
```

### iOS

```bash
# Build IPA
npx expo build:ios

# Or use EAS Build (recommended)
npx eas build --platform ios
```

## Troubleshooting

### Metro Bundler Issues

If you encounter caching issues:

```bash
npx expo start --clear
```

### Supabase Connection Issues

Make sure your environment variables are properly set:
- Check `.env.local` file exists
- Verify Supabase URL and anon key are correct
- Restart the Expo server after changing environment variables

### Gesture Handler Issues

If swipe gestures don't work:
- Make sure `react-native-gesture-handler` is properly installed
- Check that `GestureHandlerRootView` wraps your app in `_layout.tsx`

## Testing on Physical Device

1. Install **Expo Go** from App Store (iOS) or Play Store (Android)
2. Make sure your phone and computer are on the same network
3. Scan the QR code from the Expo DevTools
4. The app will load on your device

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

## License

Same as the original web application.
