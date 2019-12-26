import * as React from 'react';
import _debounce from 'lodash.debounce';
import { useHistory } from 'react-router';
import styled, { css, colors } from '~/styled';
import { UIIcon, UIButton } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { useUserPermissions } from '~/app/context';
import { CategoryFields, CategoryItem } from '../category';

/*
  CategoryList Helpers
*/

export interface CategoryHorizontalListData {
  parentCategories: CategoryFields[];
  expandedSubCategories: CategoryFields[];
  onExpandCategory: (id: string) => void;
  expandedCategoryId: string;
}

export interface CategoryHorizontalListComponentProps {
  shouldUseProductsPageLink?: boolean;
  selectedCateogryId?: string;
  onItemClick?: (category: CategoryFields) => void;
  onSubItemClick?: (category: CategoryFields) => void;
}

interface CategoryHorizontalListProps extends CategoryHorizontalListData, CategoryHorizontalListComponentProps {}

/*
  CategoryList Styles
*/

const StyledAddButton = styled(UIButton)`
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.lightGray};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primary};
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
    background: ${colors.lightGray};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    background: ${colors.gray};
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
  const popups = usePopupContext();
  const userPermissions = useUserPermissions();
  const routerHistory = useHistory();
  const [positionStatus, setPositionStatus] = React.useState({ isStart: true, isEnd: false });
  const wrapperRef = React.useRef<HTMLDivElement>();

  const onScroll = React.useCallback(
    _debounce(() => {
      const currentTarget = wrapperRef.current;
      if (currentTarget) {
        const isStart = currentTarget.scrollLeft === 0;
        const isEnd = currentTarget.scrollLeft + currentTarget.offsetWidth === currentTarget.scrollWidth;
        if (positionStatus.isStart !== isStart || positionStatus.isEnd !== isEnd) {
          setPositionStatus({ isStart, isEnd });
        }
      }
    }, 500),
    [positionStatus.isEnd, positionStatus.isStart],
  );

  const scrollManually = React.useCallback(e => {
    if (wrapperRef.current) {
      const currentScrollPosition = wrapperRef.current.scrollLeft;
      const willAddPosition = e.currentTarget.getAttribute('data-position') === 'left' ? -400 : 400;
      // TODO(0): implement animation
      wrapperRef.current.scrollTo({
        left: currentScrollPosition + willAddPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const categoryItemOnClick = React.useCallback(
    categoryField => {
      if (props.shouldUseProductsPageLink) {
        routerHistory.push(`/products/${categoryField.id}`);
      } else if (props.onItemClick) {
        props.onItemClick(categoryField);
      }
    },
    [props, routerHistory],
  );

  return (
    <CategoryListContainer>
      <IconWrapper position="left" data-position="left" isShown={!positionStatus.isStart} onClick={scrollManually}>
        <UIIcon name="chevronLeft" color={colors.white} size={20} />
      </IconWrapper>

      <StyledListTop>
        {userPermissions.category.create && (
          <StyledAddButton onClick={() => popups.createCategory.show()}>
            {/* // TODO(0): move string object */}
            Ekle <UIIcon name="add" color={colors.white} size={10} className={addIconStyle} />
          </StyledAddButton>
        )}
      </StyledListTop>
      <CategoryScrollableList onScroll={onScroll} ref={wrapperRef}>
        {props.parentCategories.map(categoryField => (
          <CategoryItem
            onExpandedCategory={props.onExpandCategory}
            subCategories={props.expandedSubCategories}
            expandedCategoryId={props.expandedCategoryId}
            onSubItemClick={subItem => {
              if (props.shouldUseProductsPageLink) {
                routerHistory.push(`/products/${subItem.id}`);
              }
              if (props.onSubItemClick) {
                props.onSubItemClick(subItem);
              }
            }}
            key={categoryField.id}
            item={categoryField}
            isHighlighted={categoryField.id === props.selectedCateogryId}
            onClick={categoryItemOnClick}
          />
        ))}
      </CategoryScrollableList>

      <IconWrapper position="right" data-position="right" isShown={!positionStatus.isEnd} onClick={scrollManually}>
        <UIIcon name="chevronRight" color={colors.white} size={20} />
      </IconWrapper>
    </CategoryListContainer>
  );
};

const CategoryHorizontalList = React.memo(_CategoryHorizontalList);

export { CategoryHorizontalList };
