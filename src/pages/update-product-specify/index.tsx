import * as React from 'react';
import { useParams } from 'react-router';
import { Container } from '~/components/ui';
import { ProductSpecifyCreateUpdateComponent } from '~/components/common/product-specify-create-or-update';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* UpdateProductSpeciyPage Helpers */
interface UpdateProductSpeciyPageProps {}
interface RouteParams {
  specifyId: string;
}
/* UpdateProductSpeciyPage Constants */

/* UpdateProductSpeciyPage Styles */

/* UpdateProductSpeciyPage Component  */
function UpdateProductSpeciyPage(props: React.PropsWithChildren<UpdateProductSpeciyPageProps>) {
  /* UpdateProductSpeciyPage Variables */
  const { specifyId } = useParams<RouteParams>();
  const { data: productSpecify, loading } = useQuery(queryEndpoints.getProductSpecifyById, {
    defaultValue: {},
    variables: { id: specifyId },
  });
  /* UpdateProductSpeciyPage Callbacks */

  /* UpdateProductSpeciyPage Lifecycle  */

  return (
    <Container>
      {productSpecify && !loading && <ProductSpecifyCreateUpdateComponent isCreate={false} data={productSpecify} />}
    </Container>
  );
}
const PureUpdateProductSpeciyPage = React.memo(UpdateProductSpeciyPage);

export { PureUpdateProductSpeciyPage as UpdateProductSpeciyPage };
