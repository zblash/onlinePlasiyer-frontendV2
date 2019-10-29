import * as React from 'react';
import { useMutation } from '~/services/context';
import { mutationEndPoints, queryEndpoints } from '~/services/endpoints';
import styled, { css } from '~/styled';
import { CategoryFields } from '..';
import { UIIcon } from '~/components/ui';
import { SubCategoryListColors } from '.';

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
const StyledModifyIconWrapper = styled.div`
  display: flex;
`;

const editIconStyle = css`
  margin-right: 8px;
`;

const SubCategory: React.SFC<CategoryFields & { onClick?: Function }> = props => {
  const [deleteCategory, deleteCategoryLoading] = useMutation(mutationEndPoints.deleteCategory, {
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

      <StyledModifyIconWrapper>
        <UIIcon
          size={18}
          name="edit"
          color={SubCategoryListColors.primary}
          className={editIconStyle}
          onClick={e => {
            e.stopPropagation();
            // TODO: edit category popup open
          }}
        />

        <UIIcon
          size={18}
          name={deleteCategoryLoading ? 'loading' : 'trash'}
          color={SubCategoryListColors.danger}
          onClick={e => {
            e.stopPropagation();
            if (!deleteCategoryLoading) {
              deleteCategory();
            }
          }}
        />
      </StyledModifyIconWrapper>
    </StyledCategoryWrapper>
  );
};

export { SubCategory };
