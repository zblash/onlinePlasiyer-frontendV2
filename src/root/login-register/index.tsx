import * as React from 'react';
import { LoginPage } from './login-page';

const LoginRegisterPage: React.SFC = props => {
  const [pageType, setPageType] = React.useState<'login' | 'register'>('login');
  if (pageType === 'login') {
    return <LoginPage gotoRegisterPage={() => setPageType('register')} />;
  }

  return <h1>Register Page</h1>;
};

const _LoginRegisterPage = LoginRegisterPage;

export { _LoginRegisterPage as LoginRegisterPage };
