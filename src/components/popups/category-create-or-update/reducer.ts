import * as React from 'react';

type CategoryPopupReducerState = {
  name: string;
  parentId?: string;
  uploadFile: File;
  isSub: boolean;
  commission: number;
};
type Action =
  | { type: 'name'; payload: string }
  | { type: 'parentCategory'; payload: string }
  | { type: 'uploadFile'; payload: File }
  | { type: 'isSub'; payload: boolean }
  | { type: 'commission'; payload: number };

const defaultState = { name: '', isSub: false, uploadFile: null, commission: 0 };

function reducer(state: CategoryPopupReducerState, action: Action): CategoryPopupReducerState {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'isSub':
      return { ...state, isSub: action.payload, parentId: action.payload ? state.parentId : null };
    case 'parentCategory':
      return { ...state, parentId: action.payload };
    case 'uploadFile':
      return { ...state, uploadFile: action.payload };
    case 'commission':
      return { ...state, commission: action.payload };
    default:
      return state;
  }
}

function useCategoryPopupReducer(initialState?: Partial<CategoryPopupReducerState>) {
  return React.useReducer(reducer, { ...defaultState, ...initialState });
}

export { useCategoryPopupReducer };
