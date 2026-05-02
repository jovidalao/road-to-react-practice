# Road to React Practice

This repository documents my learning journey through *The Road to React*. It contains practice work from the book, centered around building a Hacker Stories app with React and real Hacker News data.

## What I Have Practiced

- React fundamentals: JSX, function components, component composition, and reusable components.
- Data flow: props, state, callback handlers, lifting state up, and controlled components.
- Side effects: `useEffect`, `localStorage`, and a reusable `useStorageState` custom Hook.
- State management: `useReducer` for predictable loading, success, error, and removal states.
- Async data fetching: `fetch`, `axios`, `async/await`, and server-side search through the Hacker News API.
- Forms and modern JavaScript: form submission, destructuring, spread syntax, and `try/catch`.
- List sorting: local UI state, derived sorted lists, controlled `<select>` elements, and `lodash` sorting helpers.
- Advanced state patterns: reverse sorting, search URL history, immutable array updates, and reusable search handlers.

## Current App

The app lets users search Hacker News stories, fetch matching results from the Algolia Hacker News API, show loading and error states, sort and reverse-sort the result list, revisit recent searches, and dismiss stories from the list.

## Latest Progress

- Upgraded sorting state from a simple key to an object that remembers the active sort key and reverse direction.
- Added recent search history by storing requested URLs and deriving the latest search terms from them.
- Practiced immutable array operations with `concat`, `slice`, `map`, and `reverse`.
- Extracted reusable search behavior so form submission and history buttons share the same flow.

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

- Paginated fetching with a "Load More" flow
- Styling in React
- Testing and TypeScript
- More real-world React project maintenance patterns
