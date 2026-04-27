# Stromboli

A recipe management app built with Expo and React Native. Browse recipes, view macro nutrition charts, filter by tags, and manage your profile.

## Stack

- **Expo** (SDK 54, new architecture) — iOS, Android, Web
- **expo-router** — file-based routing
- **NativeWind v4** — Tailwind CSS styling
- **Zustand** — state management, persisted to AsyncStorage
- **victory-native + Skia** — nutrition charts
- **i18next** — English and Austrian German

## Getting Started

```bash
npm install
npx setup-skia-web   # copies canvaskit.wasm for web charts
npx expo start
```

## Scripts

```bash
npm run start        # start dev server
npm run ios          # iOS simulator
npm run android      # Android emulator
npm run web          # browser
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run typecheck    # TypeScript check
npx jest             # run tests
```
