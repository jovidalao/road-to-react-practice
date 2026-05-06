# Hacker Stories

A React practice project built while working through *The Road to React*. The app searches Hacker News stories with the Algolia Hacker News API and focuses on real-world React fundamentals: state, effects, reducers, forms, data fetching, sorting, and pagination.

## Features

- Search Hacker News stories with server-side queries.
- Show loading and error states for async requests.
- Persist the search input with `localStorage` through a custom `useStorageState` Hook.
- Sort stories by title, author, comments, or points, with reverse sorting support.
- Remember recent searches and rerun them from history buttons.
- Load more results with paginated API requests.
- Dismiss stories from the current result list.

## What This Project Covers

- React fundamentals: JSX, function components, props, controlled inputs, and component composition.
- React Hooks: `useState`, `useEffect`, `useReducer`, `useCallback`, and a custom Hook.
- State management with reducer actions for loading, success, error, and item removal.
- Async data fetching with `axios`, `async/await`, and `try/catch`.
- Modern JavaScript patterns such as destructuring, spread syntax, immutable array updates, and derived data.
- Real-world list interactions, including sorting, search history, and paginated fetching.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm lint
```

## Next Steps

- Add tests with Vitest and React Testing Library.
- Improve styling with CSS Modules or another styling approach.
- Explore TypeScript for stronger maintainability.
- Deploy the app so it can be accessed publicly.
