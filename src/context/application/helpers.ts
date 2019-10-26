import React from 'react';

export interface Popup {
  isShown: boolean;
  show: () => void;
  hide: () => void;
}

export interface Popups {
  createCategory: Popup;
}

export interface ApplicationContextValues {
  userLogin: () => void;
  userLogout: () => void;
  popups: Popups;
  user: {
    isLoggedIn: boolean;
  };
}
const emptyPopup: Popup = {
  isShown: false,
  show: () => {},
  hide: () => {},
};

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    isLoggedIn: false,
  },
  userLogin: () => {},
  userLogout: () => {},
  popups: {
    createCategory: emptyPopup,
  },
};

export interface ApplicationProviderProps {}

export const ApplicationContext = React.createContext<ApplicationContextValues>(applicationContextInitialValue);
