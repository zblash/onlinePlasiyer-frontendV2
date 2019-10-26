import * as React from 'react';

type State = {
  name: string;
  parentCategory?: { id: string; name: string };
  uploadFile: File;
  isSub: boolean;
};
type Action =
  | { type: 'name'; payload: string }
  | { type: 'parentCategory'; payload: { id: string; name: string } }
  | { type: 'uploadFile'; payload: File }
  | { type: 'isSub'; payload: boolean };

const initialState = { name: '', isSub: false, uploadFile: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'isSub':
      return { ...state, isSub: action.payload, parentCategory: action.payload ? state.parentCategory : null };
    case 'parentCategory':
      return { ...state, parentCategory: action.payload };
    case 'uploadFile':
      return { ...state, uploadFile: action.payload };
    default:
      return state;
  }
}

function useCreateCategoryReducer() {
  return React.useReducer(reducer, initialState);
}

export { useCreateCategoryReducer };
