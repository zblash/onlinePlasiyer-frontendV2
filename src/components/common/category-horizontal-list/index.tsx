import * as React from 'react';
import _debounce from 'lodash.debounce';
import styled from '~/styled';
import { CategoryFields, CategoryItem } from '../category';
import { UIIcon } from '~/components/ui';

/*
  CategoryList Helpers
*/

export interface CategoryHorizontalListData {
  categories: CategoryFields[];
}

interface CategoryHorizontalListProps extends CategoryHorizontalListData {
  selectedCateogryId?: string;
  onItemClick?: (id: string) => void;
  onSubItemClick?: (id: string) => void;
}

/*
  CategoryList Colors
*/
export const CategoryHorizontalListColors = {
  scrollableListIcon: '#fff',
  scrollbarTrack: '#e1e1e1',
  scrollbarThumb: '#878787',
};

/*
  CategoryList Styles
*/

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
  top: 71px;
  border-radius: 50%;
  cursor: pointer;
  :hover {
    opacity: ${props => (props.isShown ? 1 : 0)};
  }

  ${props => props.position}: -16px;

  transition: visibility 0.3s, opacity 0.3s linear;
  z-index: 1;
`;

const CategoryHorizontalList: React.SFC<CategoryHorizontalListProps> = props => {
  const [positionStatus, setPositionStatus] = React.useState({ isStart: true, isEnd: false });
  const wrapperRef = React.useRef<HTMLDivElement>();
  const onScrollWithDebounce = React.useCallback(_debounce(onScroll, 500), [positionStatus]);

  const onItemClick = props.onItemClick || (() => {});

  const __ = (
    <CategoryListContainer>
      <IconWrapper position="left" isShown={!positionStatus.isStart} onClick={() => scrollManually('left')}>
        <UIIcon name="chevronLeft" color={CategoryHorizontalListColors.scrollableListIcon} size={20} />
      </IconWrapper>

      <CategoryScrollableList onScroll={onScrollWithDebounce} ref={wrapperRef}>
        {props.categories.map(categoryField => (
          <CategoryItem
            onSubItemClick={props.onSubItemClick}
            key={categoryField.id}
            {...categoryField}
            isHighlighted={categoryField.id === props.selectedCateogryId}
            onClick={() => onItemClick(categoryField.id)}
          />
        ))}
      </CategoryScrollableList>

      <IconWrapper position="right" isShown={!positionStatus.isEnd} onClick={() => scrollManually('right')}>
        <UIIcon name="chevronRight" color={CategoryHorizontalListColors.scrollableListIcon} size={20} />
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

export { CategoryHorizontalList };
