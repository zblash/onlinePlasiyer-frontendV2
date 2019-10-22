import * as React from 'react';
import styled, { StylableProps } from '~/styled';
import { NavLink } from 'react-router-dom';

/*
  Link Helpers
*/
interface LinkProps extends StylableProps {
  to: string;
}

/*
  Link Colors
*/
export const LinkColors = {
  wrapperBackground: '#fff',
};

/*
  Link Styles
*/

const StyledLinkWrapper = styled(NavLink)``;

const _Link: React.SFC<LinkProps> = props => {
  const __ = (
    <StyledLinkWrapper className={props.className} to={props.to}>
      {props.children}
    </StyledLinkWrapper>
  );

  /*
  Link Lifecycle
  */

  /*
  Link Functions
  */

  return __;
};

const Link = _Link;

export { Link };
