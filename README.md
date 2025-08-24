# Expo + Clerk + Nativewind (Tailwind)

A bootstrap template for Expo apps with Clerk authentication and NativeWind (Tailwind CSS for React Native).

## What this project includes

- Expo Router for file-based routing
- Clerk (`@clerk/clerk-expo`) for authentication with secure token caching
- NativeWind + Tailwind CSS for styling React Native components
- Example custom sign-up and sign-in screens in `app/(auth)/`

## Prerequisites

- Node.js (LTS recommended)
- npm (or pnpm/yarn)

## Environment variables

Create a `.env` file in the project root with your Clerk publishable key:

```text
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
```

If you use `pnpm` or `yarn`, run the equivalent commands for your package manager.

## NativeWind / Tailwind setup

This repo contains the required config files:

- `babel.config.js` (includes `nativewind/babel` plugin)
- `tailwind.config.js`
- `postcss.config.js`
- `app/styles/global.css` (Tailwind entry with `@tailwind` directives)

## Clerk authentication

- `app/_layout.tsx` wraps the app with `ClerkProvider` and `tokenCache` for secure storage.
- The auth routes are located in `app/(auth)/` with custom `sign-in` and `sign-up` screens.

## Run the app

Start the development server:

```powershell
npm start
```

## Useful file locations

- `app/_layout.tsx` — Clerk provider + global imports
- `app/(auth)/sign-in.tsx` — custom sign-in screen
- `app/(auth)/sign-up.tsx` — custom sign-up screen
- `app/(auth)/_layout.tsx` — auth route gating
- `app/(home)/` — example signed-in home screens
- `tailwind.config.js`, `postcss.config.js`, `babel.config.js`

## References

- [Clerk Documentation](https://clerk.dev/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Documentation](https://docs.expo.dev/)

---

Happy building — tell me what you'd like next (styling, validation, or adding social sign-in).
