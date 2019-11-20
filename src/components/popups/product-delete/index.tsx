import * as React from 'react';
import { useTranslation } from '~/i18n';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { CommonDeletePopup } from '../common-delete-popup';
import { usePopupContext } from '~/contexts/popup/context';
import { ProductData } from '~/components/common/product-card';

/* ProductDeletePopup Helpers */
export interface ProductDeletePopupParams extends ProductData {}
interface ProductDeletePopupProps {
  params: ProductDeletePopupParams;
}

/* ProductDeletePopup Constants */

/* ProductDeletePopup Styles */

/* ProductDeletePopup Component  */
function ProductDeletePopup(props: React.PropsWithChildren<ProductDeletePopupProps>) {
  const { t } = useTranslation();
  const popups = usePopupContext();
  const { mutation: removeProduct, loading } = useMutation(mutationEndPoints.removeProduct, {
    variables: { id: props.params.id },
  });

  const __ = (
    <CommonDeletePopup
      title={t('popups.remove-product.are-you-sure-question', { productName: props.params.name })}
      isLoading={loading}
      onCancelClick={popups.deleteProduct.hide}
      onDeleteClick={() => removeProduct().then(() => popups.deleteProduct.hide())}
    />
  );

  /* ProductDeletePopup Lifecycle  */

  /* ProductDeletePopup Functions  */

  return __;
}

export { ProductDeletePopup };
