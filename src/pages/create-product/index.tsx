import * as React from 'react';
import { useHistory } from 'react-router';
import { Container } from '~/components/ui';
import styled, { colors } from '~/styled';
import { CreateProductComponent } from '~/components/common/create-product';
import { useAlert } from '~/utils/hooks';

/* CreateProductPage Helpers */
interface CreateProductPageProps {}

/* CreateProductPage Constants */

/* CreateProductPage Styles */
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

/* CreateProductPage Component  */
function CreateProductPage(props: React.PropsWithChildren<CreateProductPageProps>) {
  /* CreateProductPage Variables */
  const history = useHistory();
  const alert = useAlert();
  /* CreateProductPage Callbacks */
  const handleHasBarcode = React.useCallback(
    b => {
      alert.show('Bu urun sistemde bulunuyor', { type: 'error' });
      history.push('/all-products');
    },
    [alert, history],
  );
  const handleCreate = React.useCallback(
    b => {
      history.push('/all-products');
    },
    [history],
  );
  /* CreateProductPage Lifecycle  */

  return (
    <Container>
      <StyledPageWrapper>
        <StyledHeader>
          <h3>Urun Ekle</h3>
        </StyledHeader>

        <CreateProductComponent hasBarcode={handleHasBarcode} onCreate={handleCreate} isAdminPage />
      </StyledPageWrapper>
    </Container>
  );
}
const PureCreateProductPage = React.memo(CreateProductPage);

export { PureCreateProductPage as CreateProductPage };
