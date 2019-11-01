import { CategoryPopupUpdateCategoryValues } from '~/components/common/popups/category';
import { User } from '~/services/helpers/maps';
import { IUserCommonResponse } from '~/services/helpers/backend-models';

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
  popups: Popups;
  user: User;
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
    role: 'admin',
    username: '',
  },
  popups: {
    createCategory: emptyPopup,
    updateCategory: emptyPopup,
  },
};

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
