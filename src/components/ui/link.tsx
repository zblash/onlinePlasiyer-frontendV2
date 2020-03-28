import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { StylableProps } from '~/styled';

/*
  Link Helpers
*/
interface LinkProps extends StylableProps {
  to: string;
  state?: object;
  activeClassName?: string;
  onClick?: () => void;
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

const StyledLinkWrapper = styled(NavLink)`
  color: white;
  cursor: pointer;
  text-decoration: none;
`;

const _Link: React.SFC<LinkProps> = props => {
  return (
    <StyledLinkWrapper
      className={props.className}
      to={{ pathname: props.to, state: props.state }}
      activeClassName={props.activeClassName}
      onClick={props.onClick}
    >
      {props.children}
    </StyledLinkWrapper>
  );
};

const Link = _Link;

export { Link };
