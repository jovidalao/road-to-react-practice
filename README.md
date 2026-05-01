# Road to React Practice

This repository documents my learning journey through *The Road to React*. It contains practice work from the book, centered around building a Hacker Stories app with React and real Hacker News data.

## What I Have Practiced

- React fundamentals: JSX, function components, component composition, and reusable components.
- Data flow: props, state, callback handlers, lifting state up, and controlled components.
- Side effects: `useEffect`, `localStorage`, and a reusable `useStorageState` custom Hook.
- State management: `useReducer` for predictable loading, success, error, and removal states.
- Async data fetching: `fetch`, `axios`, `async/await`, and server-side search through the Hacker News API.
- Forms and modern JavaScript: form submission, destructuring, spread syntax, and `try/catch`.

## Current App

The app lets users search Hacker News stories, fetch matching results from the Algolia Hacker News API, show loading and error states, and dismiss stories from the list.

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run lint
```

## Next Learning Goals

- Styling in React
- React project maintenance
- Testing and TypeScript
- More real-world React patterns, such as sorting, search history, and pagination
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
