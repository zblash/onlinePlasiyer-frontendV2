import { User } from '~/services/helpers/maps';
import { IUserCommonResponse } from '~/services/helpers/backend-models';

export interface ApplicationContextValues {
  user: User;
}

export const applicationContextInitialValue: ApplicationContextValues = {
  user: {
    name: '',
    email: '',
    id: '',
    role: 'ADMIN',
    username: '',
  },
};

export interface ApplicationProviderProps {
  user: IUserCommonResponse;
}
