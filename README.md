# Kwiki AI Frontend

Kwiki AI is a web application for generating and studying AI-powered flashcard decks. This is the frontend, built with React, Vite, and Tailwind CSS.

## Features

- User authentication (username/password & Google OAuth)
- Create flashcard decks on any topic using AI
- Study decks with interactive flashcards and explanations
- Responsive, modern UI with light/dark mode
- Deck management (view, delete decks)
- Protected routes for authenticated users

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (for accessible UI primitives)
- [Lucide Icons](https://lucide.dev/)
- [Axios](https://axios-http.com/) (API requests)
- [React Hook Form](https://react-hook-form.com/) (forms)
- [jwt-decode](https://github.com/auth0/jwt-decode) (JWT handling)
- [React Router](https://reactrouter.com/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/kwiki-ai-fe.git
   cd kwiki-ai-fe
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the project root and add:
   ```
   VITE_API_URL=https://your-api-url.com
   ```

4. **Start the development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Project Structure

```
src/
  components/        # Reusable UI and app components
  context/           # React context providers (auth, theme)
  lib/               # Utility functions
  pages/             # Route-based page components
  services/          # API and auth logic
  utils/             # Helper utilities (e.g., token utils)
  assets/            # Static assets
  index.css          # Tailwind and global styles
  main.jsx           # App entry point
  App.jsx            # Main app component with routing
```

## Environment Variables

- `VITE_API_URL` — Base URL of the backend API (required)

## License

MIT

---

Made with ❤️ for learning and productivity.
