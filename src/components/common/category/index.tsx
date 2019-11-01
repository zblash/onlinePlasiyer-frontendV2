import * as React from 'react';
import Tooltip from 'rc-tooltip';
import styled, { css } from '~/styled';
import { UIIcon } from '~/components/ui';
import { SubCategoryList } from './sub-category-list';
import { useApplicationContext } from '~/app/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/*
  CategoryItem Helpers
*/

export interface CategoryFields {
  id: string;
  name: string;
  photoUrl: string;
  parentId?: string;
  subCategories?: Omit<CategoryFields, 'subCategories'>[];
}

interface CategoryItemProps extends CategoryFields {
  isHighlighted?: boolean;
  onClick?: () => void;
  onSubItemClick?: (category: CategoryFields) => void;
}

/*
  CategoryItem Colors
*/
const CategoryItemColors = {
  wrapperBackground: '#fff',
  wrapperActiveBackground: '#f9f9f9',
  wrapperBorder: '#e6e6e6',
  shadow: '#dadada',
  categoryName: '#4d4d4d',
  isSelected: '#0075ff',
  primary: '#0075ff',
  danger: '#e2574c',
  downArrowIcon: '#828282',
};

/*
  CategoryItem Styles
*/
const iconStyle = css`
  transform: translate(0px, -50%);
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.3s, opacity 0.3s linear, transform 0.3s;
`;

const StyledModifyIconWrapper = styled.div`
  visibility: hidden;
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
`;

const IconWrapper = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 24px;
  height: 24px;
  padding-left: 8px;
`;

const CategoryItemWrapper = styled.div<{ isHighlighted?: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: ${props => (props.isHighlighted ? `0px 2px 6px ${CategoryItemColors.shadow}` : 'none')};
  user-select: none;

  width: 210px;
  margin: 0 8px;
  height: 154px;
  background-color: ${CategoryItemColors.wrapperBackground};
  border-radius: 4px;
  flex-shrink: 0;
  border: 1px solid ${CategoryItemColors.wrapperBorder};
  cursor: pointer;

  :first-child {
    margin-left: 0;
  }
  :last-child {
    margin-right: 0;
  }
  :hover {
    box-shadow: 0px 2px 6px ${CategoryItemColors.shadow};
    .${iconStyle} {
      transform: translate(0px, 0px);
      visibility: visible;
      opacity: 1;
    }
    ${StyledModifyIconWrapper} {
      visibility: visible;
    }
  }
  :active {
    background-color: ${CategoryItemColors.wrapperActiveBackground};
  }
  transition: box-shadow 0.1s linear;
`;

const StyledCategoryImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
`;

const StyledCategoryName = styled.h3`
  font-size: 16px;
  color: ${CategoryItemColors.categoryName};
`;

const StyledSelectedStatus = styled.span<{ isShown?: boolean }>`
  position: absolute;
  left: 12px;
  top: 12px;

  display: ${props => (props.isShown ? 'block' : 'none')};
  height: 8px;
  width: 8px;
  border-radius: 50%;
  background-color: ${CategoryItemColors.isSelected};
  box-shadow: inset -25px -15px 40px rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(-45deg, rgba(255, 255, 220, 0.3) 0%, transparent 100%);
`;

const editIconStyle = css`
  margin-right: 8px;
`;

const CategoryItem: React.SFC<CategoryItemProps> = props => {
  const [isClickSubitem, setIsClickSubitem] = React.useState(false);
  const { popups } = useApplicationContext();
  const { mutation: deleteCategory, loading: deleteCategoryLoading } = useMutation(mutationEndPoints.removeCategory, {
    variables: { id: props.id },
    refetchQueries: [
      refetchFactory(queryEndpoints.getCategories, { type: 'all' }),
      refetchFactory(queryEndpoints.getCategories, { type: 'parent' }),
    ],
  });

  const tooltipProps = isClickSubitem ? { visible: false } : {};

  const __ = (
    <CategoryItemWrapper isHighlighted={props.isHighlighted} onClick={props.onClick}>
      <StyledModifyIconWrapper>
        <UIIcon
          size={18}
          name="edit"
          color={CategoryItemColors.primary}
          className={editIconStyle}
          onClick={e => {
            e.stopPropagation();
            popups.updateCategory.show({ isSub: false, name: props.name, imgSrc: props.photoUrl, id: props.id });
          }}
        />
        <UIIcon
          size={18}
          name={deleteCategoryLoading ? 'loading' : 'trash'}
          color={CategoryItemColors.danger}
          onClick={e => {
            e.stopPropagation();
            if (!deleteCategoryLoading) {
              deleteCategory();
            }
          }}
        />
      </StyledModifyIconWrapper>
      <StyledCategoryImg src={props.photoUrl} />
      <StyledCategoryName>{props.name}</StyledCategoryName>
      <StyledSelectedStatus isShown={props.isHighlighted} />
      {props.subCategories.length > 0 && (
        // TODO(0): move rc-tooltip  to custom tooltip component
        <Tooltip
          {...tooltipProps}
          overlay={
            <SubCategoryList
              categories={props.subCategories}
              onItemClick={category => {
                setIsClickSubitem(true);
                if (props.onSubItemClick) {
                  props.onSubItemClick(category);
                }
              }}
            />
          }
          placement="bottom"
        >
          <IconWrapper>
            <UIIcon
              className={iconStyle}
              name="downArrow"
              size={14}
              color={CategoryItemColors.downArrowIcon}
              onClick={e => {
                e.stopPropagation();
              }}
            />
          </IconWrapper>
        </Tooltip>
      )}
    </CategoryItemWrapper>
  );

  /*
  CategoryItem Lifecycle 
  */

  React.useEffect(() => {
    if (isClickSubitem) {
      setIsClickSubitem(false);
    }
  }, [isClickSubitem]);

  /*
  CategoryItem Functions
  */

  return __;
};

export { CategoryItem };
