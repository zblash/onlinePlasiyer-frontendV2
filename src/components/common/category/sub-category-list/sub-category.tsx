import * as React from 'react';
import styled, { css } from '~/styled';
import { CategoryFields } from '..';
import { UIIcon } from '~/components/ui';
import { SubCategoryListColors } from '.';
import { usePopupContext } from '~/contexts/popup/context';
import { useUserPermissions } from '~/app/context';

interface SubCategoryComponentProps {
  onClick?: Function;
}
interface SubCategoryProps extends CategoryFields, SubCategoryComponentProps {}

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
const SubCategory: React.SFC<SubCategoryProps> = props => {
  const popups = usePopupContext();
  const userPermissions = useUserPermissions();

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
        {userPermissions.category.edit && (
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
        )}
        {userPermissions.category.delete && (
          <UIIcon
            size={18}
            name="trash"
            color={SubCategoryListColors.danger}
            onClick={e => {
              e.stopPropagation();
              popups.deleteCategory.show({ ...props, isSub: true });
            }}
          />
        )}
      </StyledModifyIconWrapper>
    </StyledCategoryWrapper>
  );
};

export { SubCategory };
