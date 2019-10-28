import React from 'react';
import { CategoryPopupUpdateCategoryValues } from '~/components/common/popups/category';
import { IUserCommonResponse } from '~/backend-model-helpers';

export interface Popup<T = undefined> {
  isShown: boolean;
  show: (options?: T) => void;
  hide: () => void;
  options: T;
}

export interface Popups {
  createCategory: Popup;
  updateCategory: Popup<CategoryPopupUpdateCategoryValues>;
}

export interface ApplicationContextValues {
  userLogout: () => void;
  popups: Popups;
  user: IUserCommonResponse;
}
const emptyPopup: Popup = {
  isShown: false,
  options: undefined,
  show: () => {},
  hide: () => {},
};

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    name: '',
    email: '',
    id: '',
    role: 'ADMIN',
    username: '',
  },
  userLogout: () => {},
  popups: {
    createCategory: emptyPopup,
    updateCategory: emptyPopup,
  },
};

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}

export const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
