import * as React from 'react';
import styled, { StylableProps } from '~/styled';
import { CategoryFields } from '..';
import { SubCategory } from './sub-category';

/*
  SubCategoryList Helpers
*/
interface SubCategoryListProps extends StylableProps {
  categories: CategoryFields[];
  onItemClick?: (category: CategoryFields) => void;
}

export const SubCategoryListColors = {
  danger: '#e2574c',
  primary: '#0075ff',
};

/*
  SubCategoryList Styles
*/

const SubCategoryListWrapper = styled.div`
  width: 300px;
  max-height: 500px;
  height: 100%;
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
