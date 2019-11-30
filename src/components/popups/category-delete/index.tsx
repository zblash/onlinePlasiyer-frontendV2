import * as React from 'react';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useMutation } from '~/services/mutation-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useTranslation } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { refetchFactory } from '~/services/utils';
import { CommonDeletePopup } from '../common-delete-popup';
import { CategoryFields } from '~/components/common/category';

/* CategoryDeletePopup Helpers */
export interface CategoryDeletePopupParams extends CategoryFields {
  isSub: boolean;
}
interface CategoryDeletePopupProps {
  params: CategoryDeletePopupParams;
}

/* CategoryDeletePopup Constants */

/* CategoryDeletePopup Styles */

/* CategoryDeletePopup Component  */
function CategoryDeletePopup(props: React.PropsWithChildren<CategoryDeletePopupProps>) {
  const popups = usePopupContext();
  const { t } = useTranslation();

  const { mutation: deleteCategory, loading: deleteCategoryLoading } = useMutation(mutationEndPoints.removeCategory, {
    variables: { id: props.params.id },
    refetchQueries: props.params.isSub
      ? [refetchFactory(queryEndpoints.getSubCategoriesByParentId, { parentId: props.params.parentId })]
      : [refetchFactory(queryEndpoints.getParentCategories)],
  });

  const __ = (
    <CommonDeletePopup
      title={t('popups.delete-category.are-you-sure-question', { categoryName: props.params.name })}
      isLoading={deleteCategoryLoading}
      onCancelClick={popups.deleteCategory.hide}
      onDeleteClick={() => deleteCategory().then(() => popups.deleteCategory.hide())}
    />
  );

  /* CategoryDeletePopup Lifecycle  */

  /* CategoryDeletePopup Functions  */

  return __;
}

const _CategoryDeletePopup = CategoryDeletePopup;

export { _CategoryDeletePopup as CategoryDeletePopup };
