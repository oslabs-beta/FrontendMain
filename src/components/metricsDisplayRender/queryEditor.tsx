import React, { useRef } from 'react';
import addQuery from '../../helpers/addQuery';
import deleteQuery from '../../helpers/deleteQuery';
import handleAddCategory from '../../helpers/addCategory';
import handleDeleteCategory from '../../helpers/deleteCategory';

interface QueryEditorProps {
  queries: { [key: string]: string[] };
  setQueries: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>;
}

export function QueryEditor({
  queries,
  setQueries,
}: QueryEditorProps): JSX.Element {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleAddQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectRef.current && inputRef2.current) {
      const selectedValue = selectRef.current.value;
      const queryValue = inputRef2.current.value;
      addQuery(selectedValue, queryValue, setQueries);
      inputRef2.current.value = '';
    }
  };

  const handleDeleteQuery = async (
    e: React.FormEvent<HTMLFormElement>,
    key: string,
    query: string
  ) => {
    e.preventDefault();
    deleteQuery(key, query, setQueries);
  };
  return (
    <div className='queryEditor-container'>
      <div className='queryEditor-editor'>
        <div className='add-category'>
          <label htmlFor='query-category'>Category:</label>
          <input type='text' ref={inputRef1} required></input>
          <button
            type='button'
            onClick={() => {
              if (inputRef1.current) {
                const newCategory = inputRef1.current?.value;
                if (newCategory.trim()) {
                  handleAddCategory(newCategory, setQueries);
                  inputRef1.current.value = '';
                }
              }
            }}
          >
            Add
          </button>
        </div>
        <form
          onSubmit={(e) => {
            handleAddQuery(e);
          }}
        >
          <div className='add-query'>
            <label htmlFor='category-options'>Select Category:</label>
            <select className='category-options' ref={selectRef} required>
              <option></option>
              {Object.entries(queries).map(([key]) => (
                <option key={`${key} + a`}>{key}</option>
              ))}
            </select>
            <div className='query-input'>
              <label htmlFor='query-input'>Query:</label>
              <input
                type='text'
                ref={inputRef2}
                style={{ width: '600px' }}
                required
              ></input>
              <button type='submit'>Add</button>
              <button
                type='button'
                onClick={() => {
                  if (inputRef2.current) {
                    inputRef2.current.value = '';
                  }
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='queryEditor-log'>
        <div>
          {/* convert object to array then map through */}
          {Object.entries(queries).map(([key, queryArray]) => (
            <div
              key={key}
              style={{
                display: 'flex',
                marginBottom: '20px',
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteCategory(key, setQueries);
                }}
              >
                <button type='submit' style={{ marginRight: '8px' }}>
                  X
                </button>
              </form>
              <h5>{key.toUpperCase()}</h5>
              <ul style={{ listStyleType: 'none' }}>
                {queryArray.map((query: string, index: number) => (
                  <li key={`${key} + ${index}`}>
                    <form onSubmit={(e) => handleDeleteQuery(e, key, query)}>
                      <button type='submit' value={query}>
                        X
                      </button>
                    </form>
                    {query}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
