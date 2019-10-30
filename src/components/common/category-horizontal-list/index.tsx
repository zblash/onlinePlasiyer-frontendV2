import * as React from 'react';
import _debounce from 'lodash.debounce';
import { useHistory } from 'react-router';
import styled, { css } from '~/styled';
import { UIIcon, UIButton } from '~/components/ui';
import { CategoryFields, CategoryItem } from '../category';
import { useApplicationContext } from '~/app/context';

/*
  CategoryList Helpers
*/

export interface CategoryHorizontalListData {
  categories: CategoryFields[];
}

export interface CategoryHorizontalListComponentProps {
  shouldUseProductsPageLink?: boolean;
  selectedCateogryId?: string;
  onItemClick?: (category: CategoryFields) => void;
  onSubItemClick?: (category: CategoryFields) => void;
}

interface CategoryHorizontalListProps extends CategoryHorizontalListData, CategoryHorizontalListComponentProps {}

/*
  CategoryList Colors
*/
const CategoryHorizontalListColors = {
  white: '#fff',
  primary: '#0075ff',
  primaryDark: '#0062d4',
  scrollbarTrack: '#e1e1e1',
  addButtonInactive: '#ddd',
  scrollbarThumb: '#878787',
};

/*
  CategoryList Styles
*/

const StyledAddButton = styled(UIButton)`
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${CategoryHorizontalListColors.addButtonInactive};
  color: ${CategoryHorizontalListColors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${CategoryHorizontalListColors.primaryDark} !important;
  }
  :hover {
    background-color: ${CategoryHorizontalListColors.primary};
  }
`;

const CategoryListContainer = styled.div`
  position: relative;
  margin-bottom: 48px;
`;

const CategoryScrollableList = styled.div`
  display: flex;
  padding-bottom: 12px;

  overflow-x: auto;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    height: 6px;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${CategoryHorizontalListColors.scrollbarTrack};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${CategoryHorizontalListColors.scrollbarThumb};
    border-radius: 8px;
  }
`;

const IconWrapper = styled.div<{ position: 'left' | 'right'; isShown: boolean }>`
  select: none;
  display: flex;
  opacity: ${props => (props.isShown ? 0.5 : 0)};
  visibility: ${props => (props.isShown ? 'visible' : 'hidden')};
  align-items: center;
  justify-content: center;
  background-color: #999999;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 110px;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    opacity: ${props => (props.isShown ? 1 : 0)};
  }

  ${props => props.position}: -16px;

  transition: visibility 0.3s, opacity 0.3s linear;
  z-index: 1;
`;

const StyledListTop = styled.div`
  height: 48px;
  align-items: center;
  display: flex;
  justify-content: flex-end;
`;
const addIconStyle = css`
  margin-left: 8px;
`;

const _CategoryHorizontalList: React.SFC<CategoryHorizontalListProps> = props => {
  const { popups } = useApplicationContext();
  const routerHistory = useHistory();
  const [positionStatus, setPositionStatus] = React.useState({ isStart: true, isEnd: false });
  const wrapperRef = React.useRef<HTMLDivElement>();
  const onScrollWithDebounce = React.useCallback(_debounce(onScroll, 500), [positionStatus]);

  const onItemClick = props.onItemClick || (() => {});

  const __ = (
    <CategoryListContainer>
      <IconWrapper position="left" isShown={!positionStatus.isStart} onClick={() => scrollManually('left')}>
        <UIIcon name="chevronLeft" color={CategoryHorizontalListColors.white} size={20} />
      </IconWrapper>

      <StyledListTop>
        <StyledAddButton onClick={() => popups.createCategory.show()}>
          Ekle <UIIcon name="add" color={CategoryHorizontalListColors.white} size={10} className={addIconStyle} />
        </StyledAddButton>
      </StyledListTop>
      <CategoryScrollableList onScroll={onScrollWithDebounce} ref={wrapperRef}>
        {props.categories.map(categoryField => (
          <CategoryItem
            onSubItemClick={subItem => {
              if (props.shouldUseProductsPageLink) {
                routerHistory.push(`/products/${subItem.id}`);
              }
              if (props.onSubItemClick) {
                props.onSubItemClick(subItem);
              }
            }}
            key={categoryField.id}
            {...categoryField}
            isHighlighted={categoryField.id === props.selectedCateogryId}
            onClick={() => {
              if (props.shouldUseProductsPageLink) {
                routerHistory.push(`/products/${categoryField.id}`);
              }
              onItemClick(categoryField);
            }}
          />
        ))}
      </CategoryScrollableList>

      <IconWrapper position="right" isShown={!positionStatus.isEnd} onClick={() => scrollManually('right')}>
        <UIIcon name="chevronRight" color={CategoryHorizontalListColors.white} size={20} />
      </IconWrapper>
    </CategoryListContainer>
  );

  /*
  CategoryList Functions
  */
  function onScroll() {
    const currentTarget = wrapperRef.current;
    if (currentTarget) {
      const isStart = currentTarget.scrollLeft === 0;
      const isEnd = currentTarget.scrollLeft + currentTarget.offsetWidth === currentTarget.scrollWidth;
      if (positionStatus.isStart !== isStart || positionStatus.isEnd !== isEnd) {
        setPositionStatus({ isStart, isEnd });
      }
    }
  }

  function scrollManually(position: 'left' | 'right') {
    if (wrapperRef.current) {
      const currentScrollPosition = wrapperRef.current.scrollLeft;
      const willAddPosition = position === 'left' ? -200 : 200;
      // TODO: implement animation
      wrapperRef.current.scrollTo(currentScrollPosition + willAddPosition, 0);
    }
  }

  return __;
};

const CategoryHorizontalList = _CategoryHorizontalList;

export { CategoryHorizontalList };
