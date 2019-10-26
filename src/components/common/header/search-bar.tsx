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

const cssCommonColor = css`
  color: ${HeaderSearchBarColors.unFocused};
`;

const inputStyle = css`
  margin: 0 8px;
`;

const wrapperStyle = css`
  padding: 4px 8px 4px 12px;
  margin-left: 48px;
  background-color: ${HeaderSearchBarColors.defaultBackground};
  :focus-within {
    background-color: ${HeaderSearchBarColors.focusBackground};
    .${cssCommonColor} {
      color: ${HeaderSearchBarColors.focused};
    }
  }
`;

const StyledLoading = styled(Loading)<{ isHidden: boolean }>`
  visibility: ${p => (p.isHidden ? 'hidden' : 'visible')};
`;

const HeaderSearchBar: React.SFC<HeaderSearchBarProps> = props => {
  const [searchBarValue, setSearchBarValue] = React.useState('');

  const __ = (
    <UIInput
      className={wrapperStyle}
      inputClassName={inputStyle}
      placeholder="Search"
      onChange={e => setSearchBarValue(e)}
      leftIcon={<UIIcon name="search" size={20} className={cssCommonColor} />}
      rightIcon={<StyledLoading color={HeaderSearchBarColors.focused} isHidden={!searchBarValue} />}
      id="header-search-bar"
    />
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
