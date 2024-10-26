import React from 'react';

export function QueryEditor(): JSX.Element {
  return (
    <div className='queryEditor-container'>
      <div className='queryEditor-editor'>
        <input type='text'></input>
        <button>ADD</button>
      </div>

      <div className='queryEditor-log'></div>
    </div>
  );
}
