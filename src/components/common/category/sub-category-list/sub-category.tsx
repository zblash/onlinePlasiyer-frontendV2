import * as React from 'react';
import styled, { css } from '~/styled';
import { CategoryFields } from '..';
import { UIIcon } from '~/components/ui';
import { SubCategoryListColors } from '.';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useApplicationContext } from '~/app/context';

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
  const { popups } = useApplicationContext();
  const { mutation: deleteCategory, loading: deleteCategoryLoading } = useMutation(mutationEndPoints.removeCategory, {
    variables: { id: props.id },
    refetchQueries: [
      refetchFactory(queryEndpoints.getCategories, { type: 'all' }),
      refetchFactory(queryEndpoints.getCategories, { type: 'parent' }),
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
            popups.updateCategory.show({
              id: props.id,
              name: props.name,
              imgSrc: props.photoUrl,
              isSub: true,
              parentCategoryId: props.parentId,
            });
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
