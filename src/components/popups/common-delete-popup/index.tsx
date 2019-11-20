import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { UIButton, Loading } from '~/components/ui';

/* CommonDeletePopup Helpers */
interface CommonDeletePopupProps {
  title: string | React.ReactElement;
  isLoading: boolean;
  onDeleteClick: Function;
  onCancelClick: Function;
}

/* CommonDeletePopup Constants */

/* CommonDeletePopup Styles */

const StyledCommonDeletePopupWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;

const StyledQuestionTitle = styled.h4`
  margin: 16px 0 16px 0;
`;

const StyledButtonWrappers = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const StyledDeleteButton = styled(UIButton)`
  background-color: transparent;
  color: ${colors.danger};
  border: 1px solid ${colors.danger};
  :hover {
    background-color: ${colors.danger};
    color: ${colors.white};
  }
`;
const StyledCancelButton = styled(UIButton)`
  margin-right: 16px;
  background-color: transparent;
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  :hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

/* CommonDeletePopup Component  */
function CommonDeletePopup(props: React.PropsWithChildren<CommonDeletePopupProps>) {
  const { t } = useTranslation();

  const __ = (
    <StyledCommonDeletePopupWrapper>
      <StyledQuestionTitle>{props.title}</StyledQuestionTitle>
      <StyledButtonWrappers>
        <StyledCancelButton onClick={() => props.onCancelClick()}>
          {t('popups.delete-category.cancel')}
        </StyledCancelButton>
        <StyledDeleteButton onClick={() => props.onDeleteClick}>
          {props.isLoading ? <Loading color={colors.white} /> : t('popups.delete-category.delete')}
        </StyledDeleteButton>
      </StyledButtonWrappers>
    </StyledCommonDeletePopupWrapper>
  );

  /* CommonDeletePopup Lifecycle  */

  /* CommonDeletePopup Functions  */

  return __;
}

export { CommonDeletePopup };
