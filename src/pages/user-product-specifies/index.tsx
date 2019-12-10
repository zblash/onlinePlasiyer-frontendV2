import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductSpecifyListComponent } from '~/components/common/product-specify-list';

/* UserProductSpecifiesPage Helpers */
interface UserProductSpecifiesPageProps {}
interface RouteParams {
  userId?: string;
}
/* UserProductSpecifiesPage Constants */

/* UserProductSpecifiesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;

/* UserProductSpecifiesPage Component  */
function UserProductSpecifiesPage(props: React.PropsWithChildren<UserProductSpecifiesPageProps>) {
  /* UserProductSpecifiesPage Variables */
  const { userId } = useParams<RouteParams>();

  /* UserProductSpecifiesPage Callbacks */

  /* UserProductSpecifiesPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <ProductSpecifyListComponent userId={userId} />
      </StyledPageContainer>
    </Container>
  );
}
const PureUserProductSpecifiesPage = React.memo(UserProductSpecifiesPage);

export { PureUserProductSpecifiesPage as UserProductSpecifiesPage };
