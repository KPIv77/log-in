# Log-in Project

This workspace contains a small React + TypeScript login UI built with Vite.

[DEMO](https://log-in-ten-red.vercel.app/)
## Project Overview

- `App/` contains the main React application.
- The app renders a stylized login form from `App/src/component/LoginForm.tsx`.
- The form includes:
  - username and password fields
  - client-side validation for required fields
  - password visibility toggle using `lucide-react` icons
  - "Remember me" checkbox and a placeholder "Forgot password?" link
- Styling is defined in `App/src/component/LoginForm.css`.

## Tech Stack

- React
- TypeScript
- Vite

From the `App/` directory:

```bash
cd App
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

From `App/`:

```bash
npm run build
```

