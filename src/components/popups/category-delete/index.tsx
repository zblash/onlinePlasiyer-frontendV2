import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useMutation } from '~/services/mutation-context/context';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Loading, UIButton } from '~/components/ui';
import { Trans, useTranslation } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/pagination-query-context/pagination-query-endpoints';

/* CategoryDeletePopup Helpers */
export interface CategoryDeletePopupParams {
  categoryId: string;
}
interface CategoryDeletePopupProps {
  params: CategoryDeletePopupParams;
}

/* CategoryDeletePopup Constants */

/* CategoryDeletePopup Styles */
const StyledCategoryDeletePopupWrapper = styled.div`
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

const loadinStyle = css`
  margin-right: 24px;
`;

/* CategoryDeletePopup Component  */
function CategoryDeletePopup(props: React.PropsWithChildren<CategoryDeletePopupProps>) {
  const { t } = useTranslation();
  const popups = usePopupContext();
  const { data: category, loading, error } = useQuery(queryEndpoints.getCategoryByID, {
    variables: { id: props.params.categoryId },
  });
  const refetchQueryByCategory = category
    ? [refetchFactory(queryEndpoints.getCategories, { type: category.subCategory ? 'sub' : 'parent' })]
    : [];

  const { mutation: deleteCategory, loading: deleteCategoryLoading } = useMutation(mutationEndPoints.removeCategory, {
    variables: { id: props.params.categoryId },
    refetchQueries: [
      refetchFactory(queryEndpoints.getCategories, { type: 'all' }),
      ...refetchQueryByCategory,
    ],
  });

  const __ = (
    <StyledCategoryDeletePopupWrapper>
      <StyledQuestionTitle>
        <Trans i18nKey="popups.delete-category.are-you-sure-question">
          {loading ? <Loading className={loadinStyle} /> : category ? category.name : null}
        </Trans>
      </StyledQuestionTitle>
      <StyledButtonWrappers>
        <StyledCancelButton onClick={() => popups.deleteCategory.hide()}>
          {t('popups.delete-category.cancel')}
        </StyledCancelButton>
        <StyledDeleteButton onClick={() => deleteCategory().then(() => popups.deleteCategory.hide())}>
          {deleteCategoryLoading ? <Loading color={colors.white} /> : t('popups.delete-category.delete')}
        </StyledDeleteButton>
      </StyledButtonWrappers>
    </StyledCategoryDeletePopupWrapper>
  );

  /* CategoryDeletePopup Lifecycle  */

  /* CategoryDeletePopup Functions  */

  return __;
}

const _CategoryDeletePopup = CategoryDeletePopup;

export { _CategoryDeletePopup as CategoryDeletePopup };
