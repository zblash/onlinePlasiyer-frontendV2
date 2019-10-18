import * as React from 'react';
import styled, { createCssVariable } from '~/styled';
import { Icon, Loading } from '~/components/ui';

/*
  HeaderSearchBar Helpers
*/
interface HeaderSearchBarProps {}

/*
  HeaderSearchBar Colors
*/
export const HeaderSearchBarColors = {
  defaultColor: '#797979',
  focusColor: '#737373',
  defaultBackground: '#1b1b1b',
  focusBackground: '#dadada',
};

/*
  HeaderSearchBar Styles
*/
const color = createCssVariable(HeaderSearchBarColors.defaultColor);
const commontStyle = `
    color: ${color.get()};
`;

const StyledInput = styled.input`
  margin: 0 8px;
  color: ${color};

  ::placeholder {
    ${commontStyle}
  }
  :-ms-input-placeholder {
    ${commontStyle}
  }
  ::-ms-input-placeholder {
    ${commontStyle}
  }

  //reset
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  outline: none;
`;

const HeaderSearchBarWrapper = styled.div`
  display: flex;
  margin-left: 48px;
  background-color: ${HeaderSearchBarColors.defaultBackground};
  padding: 4px 8px 4px 12px;
  border-radius: 4px;
  :focus-within {
    background-color: ${HeaderSearchBarColors.focusBackground};
    ${color.set(HeaderSearchBarColors.focusColor)} !important;
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
    <HeaderSearchBarWrapper>
      <StyledLabel htmlFor="header-search-bar">
        <Icon name="search" size={20} color={color.get()} />
      </StyledLabel>
      <StyledInput
        id="header-search-bar"
        placeholder="Search"
        onChange={e => setIsShowLoading(e.target.value.length > 0)}
      />
      <StyledLabel htmlFor="header-search-bar">
        <Loading color={color.get()} isVisible={isShownLoading} />
      </StyledLabel>
    </HeaderSearchBarWrapper>
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
