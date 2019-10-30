import * as React from 'react';
import styled from '~/styled';

/*
  RegisterPage Helpers
*/
interface RegisterPageProps {}

/*
  RegisterPage Colors
*/
const RegisterPageColors = {
  wrapperBackground: '#fff',
};

/*
  RegisterPage Strings
*/
const RegisterPageStrings = {
  hello: 'Hello Register',
};

/*
  RegisterPage Styles
*/

const StyledRegisterPageWrapper = styled.div`
  background-color: ${RegisterPageColors.wrapperBackground};
`;

const RegisterPage: React.SFC<RegisterPageProps> = props => {
  const __ = <StyledRegisterPageWrapper>{RegisterPageStrings.hello}</StyledRegisterPageWrapper>;

  /*
  RegisterPage Lifecycle
  */

  /*
  RegisterPage Functions
  */

  return __;
};

const _RegisterPage = RegisterPage;

export { _RegisterPage as RegisterPage };
