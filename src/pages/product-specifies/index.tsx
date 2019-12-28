import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { Container } from '~/components/ui';
import { ProductSpecifyListComponent } from '~/components/common/product-specify-list';
import { useApplicationContext } from '~/app/context';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* ProductSpecifiesPage Helpers */
interface ProductSpecifiesPageProps {}
interface RouteParams {
  userId?: string;
}

/* ProductSpecifiesPage Constants */

/* ProductSpecifiesPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const selectBox = css`
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  padding: 7px;
  margin-bottom: 10px;
`;
/* ProductSpecifiesPage Component  */
function ProductSpecifiesPage(props: React.PropsWithChildren<ProductSpecifiesPageProps>) {
  /* ProductSpecifiesPage Variables */
  const applicationContext = useApplicationContext();
  const { data: products, loading: productLoading } = useQuery(queryEndpoints.getAllProducts, { defaultValue: [] });
  const [selectedProductId, setSelectedProducId] = React.useState();
  /* ProductSpecifiesPage Callbacks */

  /* ProductSpecifiesPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>{applicationContext.user.isAdmin ? 'Kullanici Urunleri' : 'Urunlerim'}</h3>
        </StyledPageHeader>
        <label>Urune Gore Listele : </label>
        <select className={selectBox} onChange={e => setSelectedProducId(e.target.value)}>
          {!productLoading &&
            products.map(x => (
              <option value={x.id} key={x.id}>
                {x.name}
              </option>
            ))}
        </select>
        <ProductSpecifyListComponent productId={selectedProductId} />
      </StyledPageContainer>
    </Container>
  );
}
const PureProductSpecifiesPage = React.memo(ProductSpecifiesPage);

export { PureProductSpecifiesPage as ProductSpecifiesPage };
