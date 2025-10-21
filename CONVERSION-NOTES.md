# Web to Expo Conversion Notes

## Overview

This document outlines the conversion process from the web-based React app to an Expo React Native app.

## Major Changes

### 1. Project Structure

**Before (Web):**
- Vite-based build system
- `src/` directory structure
- `index.html` entry point
- `src/main.tsx` as app entry

**After (Expo):**
- Expo-based build system
- `app/` directory for Expo Router
- `components/`, `hooks/`, `lib/`, `types/` at root level
- `app/_layout.tsx` as root layout

### 2. Routing

**Before:**
- Manual routing with state management
- View switching via state

**After:**
- Expo Router (file-based routing)
- `app/index.tsx` for main screen
- `app/profile/[id].tsx` for dynamic profile routes

### 3. Styling

**Before:**
- Tailwind CSS v4 with custom CSS
- `index.css` with extensive Tailwind utilities
- Radix UI components

**After:**
- NativeWind (Tailwind CSS for React Native)
- `global.css` with basic Tailwind directives
- Custom React Native components

### 4. UI Components

**Before:**
```tsx
<div className="flex items-center">
  <button onClick={handler}>Click</button>
  <img src={url} alt="image" />
</div>
```

**After:**
```tsx
<View className="flex-row items-center">
  <Pressable onPress={handler}>
    <Text>Click</Text>
  </Pressable>
  <Image source={{ uri: url }} />
</View>
```

### 5. Animations

**Before:**
- Framer Motion (`motion/react`)
- `useMotionValue`, `useTransform`
- CSS transitions

**After:**
- React Native Reanimated
- `useSharedValue`, `useAnimatedStyle`
- Native animations with Gesture Handler

### 6. Icons

**Before:**
- `lucide-react`

**After:**
- `lucide-react-native`
- Same icon names, different import

### 7. Navigation

**Before:**
```tsx
const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
// Conditional rendering based on state
```

**After:**
```tsx
import { useRouter } from 'expo-router';
const router = useRouter();
router.push(`/profile/${person.id}`);
```

### 8. Environment Variables

**Before:**
- `import.meta.env.VITE_SUPABASE_URL`
- Vite-specific env vars

**After:**
- `process.env.EXPO_PUBLIC_SUPABASE_URL`
- Expo-specific env vars with `EXPO_PUBLIC_` prefix

### 9. Image Handling

**Before:**
```tsx
<img src={url} className="w-full h-full object-cover" />
```

**After:**
```tsx
<Image 
  source={{ uri: url }} 
  className="w-full h-full"
  resizeMode="cover"
/>
```

### 10. Gradients

**Before:**
```tsx
<div className="bg-gradient-to-br from-pink-500 to-red-500">
```

**After:**
```tsx
// Note: NativeWind doesn't fully support gradients
// Use expo-linear-gradient for complex gradients
<LinearGradient colors={['#ec4899', '#ef4444']}>
```

## Dependencies Mapping

| Web Package | Expo Package | Notes |
|------------|--------------|-------|
| vite | expo | Build system |
| react-dom | react-native | Rendering |
| @radix-ui/* | Custom components | Built custom RN components |
| framer-motion | react-native-reanimated | Animations |
| lucide-react | lucide-react-native | Icons |
| tailwindcss | nativewind | Styling |
| sonner | Alert API | Toast notifications |
| - | expo-router | Navigation |
| - | expo-linear-gradient | Gradients |

## Files Created

### Core App Files
- `app/_layout.tsx` - Root layout with navigation
- `app/index.tsx` - Main screen
- `app/profile/[id].tsx` - Profile detail screen

### Components
- `components/AuctionCard.tsx` - Swipeable card with gestures
- `components/AuctionsView.tsx` - Main auction list
- `components/BottomNavigation.tsx` - Tab navigation
- `components/MyBidsView.tsx` - User's bids list
- `components/ProfileView.tsx` - Detailed profile view
- `components/SwipeButtons.tsx` - Swipe action buttons
- `components/UserProfileView.tsx` - User's own profile
- `components/LoadingView.tsx` - Loading state
- `components/ErrorView.tsx` - Error state

### Configuration
- `app.json` - Expo configuration
- `babel.config.js` - Babel with NativeWind
- `metro.config.js` - Metro bundler config
- `tailwind.config.js` - Tailwind/NativeWind config
- `tsconfig.json` - TypeScript config
- `package-expo.json` - Expo dependencies

### Other
- `global.css` - Global Tailwind styles
- `nativewind-env.d.ts` - NativeWind types
- `.env.example` - Environment variables template

## Known Limitations

1. **Gradient Support**: NativeWind has limited gradient support. Complex gradients may need `expo-linear-gradient`.

2. **Web Fonts**: Custom web fonts need to be loaded differently in React Native using `expo-font`.

3. **Hover States**: Mobile doesn't have hover, so hover effects are removed or replaced with press states.

4. **Scroll Behavior**: Different scroll behavior between web and native. Use `ScrollView` instead of CSS overflow.

5. **Backdrop Blur**: Limited support for backdrop blur effects on some Android devices.

## Testing Checklist

- [ ] Swipe gestures work smoothly
- [ ] Navigation between screens
- [ ] Images load correctly
- [ ] Supabase connection works
- [ ] Bottom navigation switches views
- [ ] Profile details display correctly
- [ ] Bids can be placed
- [ ] Loading states show properly
- [ ] Error states display correctly
- [ ] Works on both iOS and Android

## Performance Considerations

1. **Image Optimization**: Use `expo-image` for better image caching and performance
2. **List Rendering**: Consider using `FlatList` for large lists instead of mapping
3. **Animations**: Use `useNativeDriver: true` for better animation performance
4. **Bundle Size**: Expo apps can be larger than web apps, consider using EAS Build for optimization

## Future Improvements

1. Add `expo-image` for better image performance
2. Implement proper authentication flow
3. Add push notifications with `expo-notifications`
4. Implement deep linking
5. Add offline support with AsyncStorage
6. Optimize bundle size with EAS Build
7. Add proper error boundaries
8. Implement analytics
9. Add haptic feedback for interactions
10. Implement proper form validation for bids
