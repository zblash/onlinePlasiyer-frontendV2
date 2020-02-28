import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIInput } from '~/components/ui';

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
const StyledContent = styled.div`
  width: 100%;
`;
const StyledContentElement = styled.div``;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const selectInput = css`
  margin-bottom: 10px;
`;

/* CreateProductPage Component  */
function CreateProductPage(props: React.PropsWithChildren<CreateProductPageProps>) {
  /* CreateProductPage Variables */
  const [tax, setTax] = React.useState({ value: 0, label: '0%' });
  const taxOptions = [
    { value: 0, label: '0%' },
    { value: 1, label: '1%' },
    { value: 8, label: '8%' },
    { value: 18, label: '18%' },
  ];
  /* CreateProductPage Callbacks */

  /* CreateProductPage Lifecycle  */

  return (
    <StyledPageWrapper>
      <StyledHeader>
        <h3>Urun Ekle</h3>
      </StyledHeader>
      <StyledContent>
        <StyledContentElement>
          <label>Barkod:</label>
          <StyledInput type="text" id="product-barcode" />
        </StyledContentElement>
        <StyledContentElement>
          <label>Urun Ismi:</label>
          <StyledInput type="text" id="product-barcode" />
        </StyledContentElement>
        <StyledContentElement>
          <label>Vergi Orani:</label>
          <Select
            options={taxOptions}
            placeholder="Secim Yapin"
            className={selectInput}
            value={tax}
            onChange={e => setTax(e)}
          />
        </StyledContentElement>
        <StyledContentElement>
          <label>Barkod:</label>
          <StyledInput type="text" id="product-barcode" />
        </StyledContentElement>
        <StyledContentElement>
          <label>Barkod:</label>
          <StyledInput type="text" id="product-barcode" />
        </StyledContentElement>
      </StyledContent>
    </StyledPageWrapper>
  );
}
const PureCreateProductPage = React.memo(CreateProductPage);

export { PureCreateProductPage as CreateProductPage };
