import * as React from 'react';

import styled, { StylableProps } from '~/styled';
import { CategoryFields } from '.';

/*
  SubCategoryList Helpers
*/
interface SubCategoryListProps extends StylableProps {
  categories: Required<CategoryFields['subCategories']>;
  onItemClick?: (id: string) => void;
}

/*
  SubCategoryList Styles
*/

const SubCategoryListWrapper = styled.div`
  width: 300px;
  height: 250px;
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
  cursor: pointer;
  border-radius: 8px;
  :hover {
    box-shadow: 0px 2px 14px #b1b1b1;
  }
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

const SubCategoryList: React.SFC<SubCategoryListProps> = props => {
  const onItemClick = props.onItemClick || (() => {});
  const __ = (
    <SubCategoryListWrapper className={props.className}>
      {props.categories.map(category => (
        <StyledCategoryWrapper
          key={category.id}
          onClick={e => {
            e.stopPropagation();
            onItemClick(category.id);
          }}
        >
          <StyledImg src={category.img} />
          <StyledName>{category.name}</StyledName>
        </StyledCategoryWrapper>
      ))}
    </SubCategoryListWrapper>
  );

  /*
  SubCategoryList Functions
  */

  return __;
};

export { SubCategoryList };
