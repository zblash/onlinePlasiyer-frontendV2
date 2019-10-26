import * as React from 'react';

import styled, { StylableProps } from '~/styled';
import { CategoryFields } from '.';
import { useMutation } from '~/cache-management/hooks';
import { mutationEndPoints, queryEndpoints } from '~/services';
import { UIIcon } from '~/components/ui';

/*
  SubCategoryList Helpers
*/
interface SubCategoryListProps extends StylableProps {
  categories: CategoryFields[];
  onItemClick?: (category: CategoryFields) => void;
}
const SubCategoryListColors = {
  danger: '#e2574c',
};

/*
  SubCategoryList Styles
*/

const SubCategoryListWrapper = styled.div`
  width: 300px;
  box-shadow: 0px 5px 26px rgba(13, 12, 63, 0.05), 0px 2px 10px #b1b1b1;
  background-color: #fff;
  border-radius: 8px;
  padding: 4px;
  overflow-y: auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const StyledCategoryWrapper = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 8px;
  :hover {
    box-shadow: 0px 2px 14px #b1b1b1;
  }
`;
const SubCategoryLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 16px;
`;

const StyledName = styled.h4`
  margin: 0;
`;

const SubCategory: React.SFC<CategoryFields & { onClick?: Function }> = props => {
  const [deleteCategory, _, deleteCategoryLoading] = useMutation(mutationEndPoints.deleteCategory, {
    variables: { id: props.id },
    refetchQueries: [
      {
        query: queryEndpoints.getCategories,
        variables: { type: 'all' },
      },
    ],
  });

  return (
    <StyledCategoryWrapper
      onClick={e => {
        e.stopPropagation();
        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <SubCategoryLeftWrapper>
        <StyledImg src={props.photoUrl} />
        <StyledName>{props.name}</StyledName>
      </SubCategoryLeftWrapper>

      <UIIcon
        size={18}
        name={deleteCategoryLoading ? 'loading' : 'trash'}
        color={SubCategoryListColors.danger}
        onClick={e => {
          if (!deleteCategoryLoading) {
            e.stopPropagation();
            deleteCategory();
          }
        }}
      />
    </StyledCategoryWrapper>
  );
};

const SubCategoryList: React.SFC<SubCategoryListProps> = props => {
  const onItemClick = props.onItemClick || (() => {});
  const __ = (
    <SubCategoryListWrapper className={props.className}>
      {props.categories.map(category => (
        <SubCategory key={category.id} {...category} onClick={() => onItemClick(category)} />
      ))}
    </SubCategoryListWrapper>
  );

  /*
  SubCategoryList Functions
  */

  return __;
};

export { SubCategoryList };
