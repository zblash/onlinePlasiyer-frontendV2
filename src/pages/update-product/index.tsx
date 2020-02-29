import * as React from 'react';
import { useHistory, useParams } from 'react-router';
import styled, { colors } from '~/styled';
import { useAlert } from '~/utils/hooks';
import { Container } from '~/components/ui';
import { CreateProductComponent } from '~/components/common/create-product';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* UpdateProductPage Helpers */
interface UpdateProductPageProps {}
interface RouteParams {
  productId: string;
}
/* UpdateProductPage Constants */

/* UpdateProductPage Styles */
const StyledPageWrapper = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 15px auto 0 auto;
  background-color: ${colors.white};
  padding: 15px 1%;
  max-width: 70%;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;

/* UpdateProductPage Component  */
function UpdateProductPage(props: React.PropsWithChildren<UpdateProductPageProps>) {
  /* UpdateProductPage Variables */
  /* UpdateProductPage Callbacks */
  const history = useHistory();
  const { productId } = useParams<RouteParams>();
  const alert = useAlert();
  const { data: product, loading: productLoading } = useQuery(queryEndpoints.getProductById, {
    defaultValue: {},
    variables: { id: productId },
  });
  /* CreateProductPage Callbacks */

  const handleCreate = React.useCallback(
    b => {
      alert.show('Urun guncellendi', { type: 'success' });
      history.push('/all-products');
    },
    [history, alert],
  );
  /* UpdateProductPage Lifecycle  */

  return (
    <Container>
      {!productLoading && (
        <StyledPageWrapper>
          <StyledHeader>
            <h3>Urun Duzenle</h3>
          </StyledHeader>

          <CreateProductComponent onCreate={handleCreate} isAdminPage initialValue={product} type="update" />
        </StyledPageWrapper>
      )}
    </Container>
  );
}
const PureUpdateProductPage = React.memo(UpdateProductPage);

export { PureUpdateProductPage as UpdateProductPage };
