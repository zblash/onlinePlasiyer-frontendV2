import * as React from 'react';
import styled, { css } from '~/styled';
import { UIIcon, Loading, UIInput } from '~/components/ui';

/*
  HeaderSearchBar Helpers
*/
interface HeaderSearchBarProps {}

/*
  HeaderSearchBar Colors
*/
export const HeaderSearchBarColors = {
  unFocused: '#797979',
  focused: '#737373',
  defaultBackground: '#1b1b1b',
  focusBackground: '#dadada',
};

/*
  HeaderSearchBar Styles
*/
const cssVariable = css.variable(HeaderSearchBarColors.unFocused);

const StyledInput = styled(UIInput)`
  margin: 0 8px;
  color: ${cssVariable};
`;

const StyledHeaderSearchBarWrapper = styled.div`
  display: flex;
  margin-left: 48px;
  background-color: ${HeaderSearchBarColors.defaultBackground};
  padding: 4px 8px 4px 12px;
  border-radius: 4px;
  :focus-within {
    background-color: ${HeaderSearchBarColors.focusBackground};
    ${cssVariable.set(HeaderSearchBarColors.focused)} !important;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderSearchBar: React.SFC<HeaderSearchBarProps> = props => {
  const [isShownLoading, setIsShowLoading] = React.useState(false);

  const __ = (
    <StyledHeaderSearchBarWrapper>
      <StyledLabel htmlFor="header-search-bar">
        <UIIcon name="search" size={20} color={cssVariable.get()} />
      </StyledLabel>
      <StyledInput
        id="header-search-bar"
        placeholder="Search"
        onChange={e => setIsShowLoading(e.target.value.length > 0)}
      />
      <StyledLabel htmlFor="header-search-bar">
        <Loading color={cssVariable.get()} isVisible={isShownLoading} />
      </StyledLabel>
    </StyledHeaderSearchBarWrapper>
  );

  /*
  HeaderSearchBar Lifecycle
  */

  /*
  HeaderSearchBar Functions
  */

  return __;
};

export { HeaderSearchBar };
