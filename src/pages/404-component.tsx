import * as React from 'react';
import styled from '~/styled';

/*
  Page404 Helpers
*/
interface Page404Props {}

/*
  Page404 Colors // TODO : move theme.json
*/
const Page404Colors = {
  wrapperBackground: '#fff',
};

/*
  Page404 Strings
*/
const Page404Strings = {
  pageNotFount: 'Sayfa bulunamadi',
};

/*
  Page404 Styles
*/

const StyledPage404Wrapper = styled.div`
  background-color: ${Page404Colors.wrapperBackground};
`;

function Page404(props: React.PropsWithChildren<Page404Props>) {
  const __ = <StyledPage404Wrapper>{Page404Strings.pageNotFount}</StyledPage404Wrapper>;

  /*
  Page404 Lifecycle
  */

  /*
  Page404 Functions
  */

  return __;
}

const _Page404 = Page404;

export { _Page404 as Page404 };
