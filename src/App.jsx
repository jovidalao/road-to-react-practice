import "./App.css";
import * as React from "react";
import axios from 'axios';
import sortBy from 'lodash/sortBy';

// API configuration and URL helpers.
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getUrl = (searchTerm, page) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const extractSearchTerm = (url) =>
  url
    .substring(url.lastIndexOf('?') + 1, url.lastIndexOf('&'))
    .replace(PARAM_SEARCH, '');

const getLastSearches = (urls) =>
  urls
    .slice(-5)
    .map((url) => extractSearchTerm(url));



// Reducer actions keep all story-list state transitions in one place.
const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.page === 0 ? action.payload.list : state.data.concat(action.payload.list),
        page: action.payload.page,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(item => item.objectID !== action.payload.objectID),
      };
    default:
      throw new Error();
  }
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState,
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments'),
  POINTS: list => sortBy(list, 'points'),
}

// Main application flow: search, fetch, render, and paginate stories.
function App() {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, dispatch] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false, page: 0 });
  const [urls, setUrls] = React.useState([
    getUrl(searchTerm, 0),
  ]);

  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  }

  const handleFetchStories = React.useCallback(async () => {
    dispatch({ type: 'STORIES_FETCH_INIT' });
  
    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatch({
        type: 'STORIES_FETCH_SUCCESS',
        payload: {
          list: result.data.hits,
          page: result.data.page,
        },
      })
    } catch {
      dispatch({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatch({ type: 'REMOVE_STORY', payload: item });
  };

  React.useEffect(() => {
    localStorage.setItem("search", searchTerm);
  }, [searchTerm]);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchAction = () => {
    handleSearch(searchTerm, 0);
  }

  const handleLastSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  }

  const lastSearches = getLastSearches(urls);
  
  return (
    <>
      <h1>My Hacker Stories</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} searchAction={searchAction} />
      <LastSearches lastSearches={lastSearches} onLastSearch={handleLastSearch} />
      <hr />
      {stories.isError && <p>Something went wrong...</p>}
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      {stories.isLoading ? <p>Loading...</p> : (<button type="button" onClick={handleMore}>More</button>)}
    </>
  );
}

// Search-related components.
const SearchForm = ({
  searchTerm,
  onSearchInput,
  searchAction,
}) => (
  <form action={searchAction}>
    <InputWithLabel id="search" value={searchTerm} isFocused onInputChange={onSearchInput}>
    <strong>Search:</strong>
    </InputWithLabel>
    &nbsp;
    <button type="submit" disabled={!searchTerm}>Search</button>
  </form>
)

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange}></input>
  </>
);

const LastSearches = ({ lastSearches, onLastSearch }) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={`${searchTerm}-${index}`}
        type="button"
        onClick={() => onLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

// Story-list components.
const List = ({ list, onRemoveItem }) => {
  
  const [sort, setSort] = React.useState({ sortKey: 'NONE', isReversed: false });
  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReversed ? [...sortFunction(list)].reverse() : sortFunction(list);

  const handleSort = (sortKey) => {
    const isReversed = sort.sortKey === sortKey && !sort.isReversed;
    setSort({ sortKey, isReversed });
  }

  return (
    <ul>
      <li style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{ width: '30%' }}>
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('COMMENTS')}>
            Comments
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('POINTS')}>
            Points
          </button>
        </span>
        <span style={{ width: '10%' }}>Actions</span>
      </li>

      {sortedList.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <li style={{ display: 'flex' }}>
    <span style={{ width: '40%' }}>
      <a href={item.url}>{item.title}</a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <button
        type="button"
        onClick={() => {
          onRemoveItem(item);
        }}
      >
        Dismiss
      </button>
    </span>
  </li>
);

export default App;
