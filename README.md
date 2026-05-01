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

## Current App

The app lets users search Hacker News stories, fetch matching results from the Algolia Hacker News API, show loading and error states, sort the result list, and dismiss stories from the list.

## Latest Progress

- Added sorting options for title, author, number of comments, and points.
- Used a `SORTS` configuration object to connect sort keys with sorting behavior.
- Rendered sorting options from object keys instead of hardcoding every dropdown option.
- Practiced separating local UI state from fetched server data.

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
- More real-world React patterns, such as search history and pagination
