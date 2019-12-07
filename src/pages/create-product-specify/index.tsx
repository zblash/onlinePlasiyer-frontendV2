import * as React from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router';
import styled, { colors, css } from '~/styled';
import { Container, UIInput, UIButton } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { UnitTypeResponse } from '~/services/helpers/backend-models';
import { useApplicationContext } from '~/app/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useAlert } from '~/utils/hooks';

/* CreateProductSpecifyPage Helpers */
interface CreateProductSpecifyPageProps {}

/* CreateProductSpecifyPage Constants */

/* CreateProductSpecifyPage Styles */
const StyledCreateProductSpecifyPageWrapper = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 15px auto 0 auto;
  background-color: ${colors.white};
  padding: 15px 1%;
  max-width: 70%;
`;
const StyledCreateProductSpecifyHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;
const StyledCreateProductSpecifyContent = styled.div`
  width: 100%;
`;
const StyledCreateProductSpecifyContentElement = styled.div``;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const StyledButton = styled(UIButton)`
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 7px 35px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primaryDark};
  }
`;
const selectInput = css`
  margin-bottom: 10px;
`;
/* CreateProductSpecifyPage Component  */
function CreateProductSpecifyPage(props: React.PropsWithChildren<CreateProductSpecifyPageProps>) {
  /* CreateProductSpecifyPage Variables */
  const alertContext = useAlert();
  const routerHistory = useHistory();
  const popup = usePopupContext();
  const applicationContext = useApplicationContext();
  const [barcode, setBarcode] = React.useState();
  const [contents, setContents] = React.useState();
  const [quantity, setQuantity] = React.useState();
  const [recommendedRetailPrice, setRecomendedRetailPrice] = React.useState();
  const [totalPrice, setTotalPrice] = React.useState();
  const [unitPrice, setUnitPrice] = React.useState();
  const [unitType, setUnitType] = React.useState<UnitTypeResponse>('AD');
  const [stateIds, setStateIds] = React.useState(['']);
  const unitTypeOptions = [
    { value: 'AD', label: 'ADET' },
    { value: 'KG', label: 'KG' },
    { value: 'KL', label: 'KOLI' },
  ];
  const { mutation: createProductSpecify } = useMutation(mutationEndPoints.createSpecifyProductForAuthUser, {
    variables: {
      barcode,
      contents,
      quantity,
      recommendedRetailPrice,
      stateIds,
      totalPrice,
      unitPrice,
      unitType,
    },
  });
  /* CreateProductSpecifyPage Callbacks */

  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    createProductSpecify()
      .then(() => {
        alertContext.show('Urun Basariyla Eklendi', { type: 'success' });
        routerHistory.push('/product-specifies');
      })
      .catch(() => {
        alertContext.show('Lutfen Tum Alanlari Doldurun', { type: 'error' });
      })
      .finally(() => {
        applicationContext.loading.hide();
      });
  }, [createProductSpecify, applicationContext.loading, alertContext, routerHistory]);

  const handleStateChange = React.useCallback(
    e => {
      setStateIds(e.map(x => x.value));
    },
    [setStateIds],
  );
  const handleUnitTypeChange = React.useCallback(
    e => {
      setUnitType(e.value);
    },
    [setUnitType],
  );
  /* CreateProductSpecifyPage Lifecycle  */

  React.useEffect(() => {
    if (!barcode && !popup.createProduct.isShown) {
      popup.createProduct.show({
        hasBarcode: b => {
          setBarcode(b);
          popup.createProduct.hide();
        },
        onCreate: b => {
          setBarcode(b);
        },
      });
    }
  }, [barcode, setBarcode, popup.createProduct]);

  return (
    <Container>
      <StyledCreateProductSpecifyPageWrapper>
        <StyledCreateProductSpecifyHeader>
          <h3>Urun Ekle</h3>
        </StyledCreateProductSpecifyHeader>
        <StyledCreateProductSpecifyContent>
          <StyledCreateProductSpecifyContentElement>
            <label>Icerik</label>
            <StyledInput id="content" type="text" value={contents} onChange={setContents} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Adet</label>
            <StyledInput id="quantity" type="text" value={quantity} onChange={setQuantity} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Tavsiye Ettiginiz Satis Fiyati</label>
            <StyledInput id="rcmdprc" type="text" value={recommendedRetailPrice} onChange={setRecomendedRetailPrice} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Fiyat</label>
            <StyledInput id="totalPrice" type="text" value={totalPrice} onChange={setTotalPrice} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Adet Fiyati</label>
            <StyledInput id="unitPrice" type="text" value={unitPrice} onChange={setUnitPrice} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Icerik Turu</label>
            <Select
              options={unitTypeOptions}
              placeholder="Secim Yapin"
              className={selectInput}
              onChange={handleUnitTypeChange}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Satis Yapacaginiz Bolgeler</label>
            <Select
              isMulti
              className={selectInput}
              isSearchable
              isClearable
              onChange={handleStateChange}
              options={applicationContext.user.activeStates.map(x => ({
                value: x.id,
                label: `${x.cityTitle} - ${x.title}`,
              }))}
              placeholder="Secim Yapin"
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <StyledButton onClick={handleSubmit}>Ekle</StyledButton>
          </StyledCreateProductSpecifyContentElement>
        </StyledCreateProductSpecifyContent>
      </StyledCreateProductSpecifyPageWrapper>
    </Container>
  );
}
const PureCreateProductSpecifyPage = React.memo(CreateProductSpecifyPage);

export { PureCreateProductSpecifyPage as CreateProductSpecifyPage };
