import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { StylableProps } from '~/styled';

/*
  Link Helpers
*/
interface LinkProps extends StylableProps {
  to: string;
}

/*
  Link Colors // TODO : move theme.json
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
