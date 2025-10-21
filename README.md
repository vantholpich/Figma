# Friend Auction App - Expo React Native

A mobile dating/auction app built with Expo, React Native, and Supabase. Swipe through profiles, place bids, and connect with friends!

## 📱 Features

- 🎯 Swipeable auction cards with smooth animations
- 👤 Detailed profile views with galleries and testimonials
- 💰 Bid tracking and management
- 🎨 Beautiful UI with NativeWind (Tailwind CSS for React Native)
- 🔄 Real-time data with Supabase
- 📊 User profile with stats and activity

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Supabase account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd friend-auction-app
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables:**
   ```bash
   copy .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database:**
   - Go to your Supabase project dashboard
   - Run the SQL scripts in the SQL Editor:
     - `supabase-schema.sql` (creates tables)
     - `supabase-complete-setup.sql` (adds sample data)

5. **Start the app:**
   ```bash
   npx expo start
   ```

6. **Run on your device:**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator / `i` for iOS simulator

## 🛠️ Tech Stack

- **Framework:** Expo SDK 54
- **Language:** TypeScript
- **UI:** React Native + NativeWind (Tailwind CSS)
- **Navigation:** Expo Router
- **Animations:** React Native Reanimated v4
- **Gestures:** React Native Gesture Handler
- **Backend:** Supabase
- **Icons:** Lucide React Native

## 📂 Project Structure

```
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home screen
│   └── profile/[id].tsx   # Profile detail screen
├── components/            # React Native components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities (Supabase client)
├── types/                 # TypeScript types
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── tailwind.config.js    # Tailwind/NativeWind config
└── package.json          # Dependencies
```

## 🎮 Usage

1. **Browse Auctions:** Swipe through profile cards
   - Swipe right or tap ❤️ to like
   - Swipe left or tap ✖️ to pass
   - Tap card to view full profile

2. **View Profiles:** See detailed information
   - Photo gallery
   - Pros and cons
   - Interests and hobbies
   - Testimonials from friends

3. **Place Bids:** Make your offer
   - View current bid status
   - Add optional message

4. **Track Bids:** Monitor your activity
   - See all active bids
   - Check winning/outbid status
   - Time remaining on auctions

## 🔧 Development

### Available Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web (limited support)
npm run clear      # Clear cache and restart
```

### Environment Variables

- `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## 📝 Documentation

- [QUICK-START.md](QUICK-START.md) - 5-minute setup guide
- [SETUP-INSTRUCTIONS.md](SETUP-INSTRUCTIONS.md) - Detailed setup
- [CONVERSION-NOTES.md](CONVERSION-NOTES.md) - Web to Expo conversion details
- [README-EXPO.md](README-EXPO.md) - Complete Expo documentation

## 🐛 Troubleshooting

### Metro bundler issues
```bash
npx expo start --clear
```

### Supabase connection issues
- Verify `.env.local` has correct credentials
- Restart Expo server after changing env variables

### Gesture handler not working
```bash
npm install --legacy-peer-deps
npx expo start --clear
```

## 📱 Building for Production

### Android
```bash
npx eas build --platform android
```

### iOS
```bash
npx eas build --platform ios
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI components styled with [NativeWind](https://www.nativewind.dev/)
- Backend powered by [Supabase](https://supabase.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

For issues and questions:
- Check the [documentation files](./SETUP-INSTRUCTIONS.md)
- Open an issue on GitHub
- Refer to [Expo documentation](https://docs.expo.dev/)

---

Made with ❤️ using Expo and React Native
