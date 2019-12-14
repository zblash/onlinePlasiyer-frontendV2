import * as React from 'react';
import { Container } from '~/components/ui';
import { ProductSpecifyCreateUpdateComponent } from '~/components/common/product-specify-create-or-update';

/* CreateProductSpecifyPage Helpers */
interface CreateProductSpecifyPageProps {}

/* CreateProductSpecifyPage Constants */

/* CreateProductSpecifyPage Styles */

/* CreateProductSpecifyPage Component  */
function CreateProductSpecifyPage(props: React.PropsWithChildren<CreateProductSpecifyPageProps>) {
  /* CreateProductSpecifyPage Variables */

  return (
    <Container>
      <ProductSpecifyCreateUpdateComponent isCreate />
    </Container>
  );
}
const PureCreateProductSpecifyPage = React.memo(CreateProductSpecifyPage);

export { PureCreateProductSpecifyPage as CreateProductSpecifyPage };
