import * as React from 'react';
import { useTranslation } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { CommonDeletePopup } from '../common-delete-popup';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';

/* ProductSpecifyDeletePopup Helpers */
export interface ProductSpecifyDeletePopupParams {
  id: string;
  refetchQuery?: any;
}
interface ProductSpecifyDeletePopupProps {
  params: ProductSpecifyDeletePopupParams;
}
/* ProductSpecifyDeletePopup Constants */

/* ProductSpecifyDeletePopup Styles */

/* ProductSpecifyDeletePopup Component  */
function ProductSpecifyDeletePopup(props: React.PropsWithChildren<ProductSpecifyDeletePopupProps>) {
  /* ProductSpecifyDeletePopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const refetchQueries = React.useMemo(() => (props.params.refetchQuery ? [props.params.refetchQuery] : []), [
    props.params.refetchQuery,
  ]);
  const { mutation: removeProductSpecify, loading, error } = useMutation(mutationEndPoints.removeProductSpecify, {
    variables: { id: props.params.id },
    refetchQueries,
  });

  /* ProductSpecifyDeletePopup Callbacks */

  const handleDelete = React.useCallback(() => {
    removeProductSpecify().then(() => popups.deleteProductSpecify.hide());
  }, [removeProductSpecify, popups.deleteProductSpecify]);

  const handleCancel = React.useCallback(() => {
    popups.deleteProductSpecify.hide();
  }, [popups.deleteProductSpecify]);

  /* ProductSpecifyDeletePopup Lifecycle  */

  return (
    <CommonDeletePopup
      title={t('popups.remove-product-specify.are-you-sure-question')}
      isLoading={loading}
      errorText={error ? t('popups.remove-product.failed-message') : ''}
      onCancelClick={handleCancel}
      onDeleteClick={handleDelete}
    />
  );
}
const PureProductSpecifyDeletePopup = React.memo(ProductSpecifyDeletePopup);

export { PureProductSpecifyDeletePopup as ProductSpecifyDeletePopup };
