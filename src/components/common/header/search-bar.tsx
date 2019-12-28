import * as React from 'react';
import debounce from 'lodash.debounce';
import styled, { css, colors } from '~/styled';
import { UIIcon, Loading, UIInput, UILink } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/*
  HeaderSearchBar Helpers
*/
interface HeaderSearchBarProps {}

/*
  HeaderSearchBar Colors // TODO : move theme.json
*/
const HeaderSearchBarColors = {
  unFocused: '#797979',
  focused: '#737373',
  defaultBackground: '#404448',
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
  color: ${HeaderSearchBarColors.unFocused};
`;
const wrapperStyle = css`
  padding: 4px 8px 4px 12px;
  width: 100%;
  background-color: ${HeaderSearchBarColors.defaultBackground};
  :focus-within {
    background-color: ${HeaderSearchBarColors.focusBackground};
  }
`;
const StyledResultsWrapper = styled.div`
  width: 99.3%;
  top: 16px;
  border: 1px solid ${colors.lightGray}
  padding: 12px 8px 4px 12px;
  position: absolute;
  background-color: white;
  display: none;
  z-index: -1;
  border-radius: 4px;
  :hover {
    display: block;
  }
`;
const WrapperDiv = styled.div`
  position: relative;
  margin-left: auto;
  :focus-within {
    ${StyledResultsWrapper} {
      display: block;
    }
    .${cssCommonColor} {
      color: ${HeaderSearchBarColors.focused};
    }
    .${wrapperStyle} {
      border-radius: 20px;
    }
  }
`;
const StyledResults = styled.div`
  position: relative;
  float: left;
  width: 100%;
  padding: 5px 0 5px 0;
  border-bottom: 1px solid ${colors.lightGray};
  color: ${colors.black};
`;
const StyledLoading = styled(Loading)<{ isHidden: boolean }>`
  visibility: ${p => (p.isHidden ? 'hidden' : 'visible')};
`;
const StyledLink = styled(UILink)`
  color: ${colors.black};
`;
const HeaderSearchBar: React.SFC<HeaderSearchBarProps> = props => {
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const { data: products, loading } = useQuery(queryEndpoints.getProductsByFilter, {
    defaultValue: [],
    variables: { name: searchBarValue },
    skip: searchBarValue === '',
  });
  const delayedSearch = debounce(e => {
    setSearchBarValue(e);
  }, 500);
  const handleSearch = React.useCallback(
    e => {
      delayedSearch(e);
    },
    [delayedSearch],
  );

  const __ = (
    <WrapperDiv>
      <UIInput
        className={wrapperStyle}
        inputClassName={inputStyle}
        placeholder="Urun Ara"
        onChange={e => handleSearch(e)}
        leftIcon={<UIIcon name="search" size={20} className={cssCommonColor} />}
        rightIcon={<StyledLoading color={HeaderSearchBarColors.focused} isHidden={!loading} />}
        id="header-search-bar"
      />
      {products.length !== 0 && (
        <StyledResultsWrapper>
          {products.map(product => (
            <StyledResults key={product.id}>
              <StyledLink to={`/search/${product.id}`}>
                <span>{product.name}</span>
              </StyledLink>
            </StyledResults>
          ))}
        </StyledResultsWrapper>
      )}
    </WrapperDiv>
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
