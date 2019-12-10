import * as React from 'react';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductSpecifyListComponent } from '~/components/common/product-specify-list';

/* ProductSpecifiesPage Helpers */
interface ProductSpecifiesPageProps {}
interface RouteParams {
  userId?: string;
}

/* ProductSpecifiesPage Constants */

/* ProductSpecifiesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

/* ProductSpecifiesPage Component  */
function ProductSpecifiesPage(props: React.PropsWithChildren<ProductSpecifiesPageProps>) {
  /* ProductSpecifiesPage Variables */

  /* ProductSpecifiesPage Callbacks */

  /* ProductSpecifiesPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <ProductSpecifyListComponent />
      </StyledPageContainer>
    </Container>
  );
}
const PureProductSpecifiesPage = React.memo(ProductSpecifiesPage);

export { PureProductSpecifiesPage as ProductSpecifiesPage };
