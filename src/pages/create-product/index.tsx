import * as React from 'react';
import styled, { colors } from '~/styled';
import { useTranslation } from '~/i18n';

/* CreateProductPage Helpers */
interface CreateProductPageProps {}

/* CreateProductPage Constants */

/* CreateProductPage Styles */
const StyledCreateProductPageWrapper = styled.div`
  background-color: ${colors.primary};
`;

/* CreateProductPage Component  */
function CreateProductPage(props: React.PropsWithChildren<CreateProductPageProps>) {
  /* CreateProductPage Variables */
  const { t } = useTranslation();
  /* CreateProductPage Callbacks */

  /* CreateProductPage Lifecycle  */

  return <StyledCreateProductPageWrapper>{t('common.hello')}</StyledCreateProductPageWrapper>;
}
const PureCreateProductPage = React.memo(CreateProductPage);

export { PureCreateProductPage as CreateProductPage };
