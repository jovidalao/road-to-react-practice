import "./App.css";
import * as React from "react";
import axios from 'axios';
import sortBy from 'lodash/sortBy';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';



function App() {
  const [searchTerm, setSearchTerm] = useStorageState("search", "React");
  const [stories, dispatch] = React.useReducer(storiesReducer, { data: [], isLoading: false, isError: false });
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);


  const handleFetchStories = React.useCallback(async () => {
    dispatch({ type: 'STORIES_FETCH_INIT' });
  
    try {
    const result = await axios.get(url);

    dispatch({
      type: 'STORIES_FETCH_SUCCESS',
      payload: result.data.hits,
    })
  } catch {
      dispatch({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

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
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }
  
  return (
    <>
      <h1>My Hacker Stories</h1>
      <SearchForm searchTerm={searchTerm} onSearchInput={handleSearchInput} searchAction={searchAction} />
      <hr />
      {stories.isError && <p>Something went wrong...</p>}
      {stories.isLoading ? <p>Loading...</p> : <List list={stories.data} onRemoveItem={handleRemoveStory} />}
    </>
  );
}

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
        data: action.payload,
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



const List = ({ list, onRemoveItem }) => {
  
  const [sort, setSort] = React.useState('NONE');
  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  const handleSort = (event) => {
    setSort(event.target.value);
  }

  return (
    <>
    <label htmlFor="sort">Sort by:</label>
    <select id="sort" onChange={handleSort} value={sort}>
      <option value="NONE">None</option>
      <option value="TITLE">Title</option>
      <option value="AUTHOR">Author</option>
      <option value="COMMENTS">Comments</option>
      <option value="POINTS">Points</option>
      </select>
  <ul>
    {sortedList.map((item) => (
      <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
    ))}
  </ul>
  </>
  );
};

const Item = ({ item, onRemoveItem }) => (
  <li>
    <span>
      <a>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
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



export default App;
