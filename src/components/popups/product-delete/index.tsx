import * as React from 'react';
import { useTranslation } from '~/i18n';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { CommonDeletePopup } from '../common-delete-popup';
import { usePopupContext } from '~/contexts/popup/context';

/* ProductDeletePopup Helpers */
export interface ProductDeletePopupParams {
  id: string;
  name: string;
  refetchQuery?: any;
}
interface ProductDeletePopupProps {
  params: ProductDeletePopupParams;
}

/* ProductDeletePopup Constants */

/* ProductDeletePopup Styles */

/* ProductDeletePopup Component  */
function ProductDeletePopup(props: React.PropsWithChildren<ProductDeletePopupProps>) {
  const { t } = useTranslation();
  const popups = usePopupContext();
  const refetchQueries = React.useMemo(() => (props.params.refetchQuery ? [props.params.refetchQuery] : []), [
    props.params.refetchQuery,
  ]);
  const { mutation: removeProduct, loading, error } = useMutation(mutationEndPoints.removeProduct, {
    variables: { id: props.params.id },
    refetchQueries,
  });

  const __ = (
    <CommonDeletePopup
      title={t('popups.remove-product.are-you-sure-question', { productName: props.params.name })}
      isLoading={loading}
      errorText={error ? t('popups.remove-product.failed-message') : ''}
      onCancelClick={popups.deleteProduct.hide}
      onDeleteClick={() => removeProduct().then(() => popups.deleteProduct.hide())}
    />
  );

  /* ProductDeletePopup Lifecycle  */

  /* ProductDeletePopup Functions  */

  return __;
}

export { ProductDeletePopup };
