import * as React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIButton, UIInput } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { usePopupContext } from '~/contexts/popup/context';
import { useApplicationContext } from '~/app/context';
import { ISpecifyProductResponse } from '~/services/helpers/backend-models';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { refetchFactory } from '~/services/utils';

/* ProductSpecifyCreateUpdateComponent Helpers */
interface ProductSpecifyCreateUpdateComponentProps {
  isCreate: boolean;
  data?: ISpecifyProductResponse;
}

/* ProductSpecifyCreateUpdateComponent Constants */

/* ProductSpecifyCreateUpdateComponent Styles */
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
  :disabled {
    background-color: ${colors.lightGray};
    color: ${colors.primary};
  }
`;
const selectInput = css`
  margin-bottom: 10px;
`;

/* ProductSpecifyCreateUpdateComponent Component  */
function ProductSpecifyCreateUpdateComponent(props: React.PropsWithChildren<ProductSpecifyCreateUpdateComponentProps>) {
  const initialValues = {
    barcode: props.data ? props.data.productBarcodeList[0] : '',
    contents: props.data ? props.data.contents : 0,
    quantity: props.data ? props.data.quantity : 0,
    recommendedRetailPrice: props.data ? props.data.recommendedRetailPrice : 0,
    totalPrice: props.data ? props.data.totalPrice : 0,
    unitPrice: props.data ? props.data.unitPrice : 0,
    unitType: props.data ? props.data.unitType : null,
    stateIds: props.data ? props.data.states : [],
  };
  const alertContext = useAlert();
  const routerHistory = useHistory();
  const popup = usePopupContext();
  const applicationContext = useApplicationContext();
  const [barcode, setBarcode] = React.useState(initialValues.barcode);
  const [contents, setContents] = React.useState(initialValues.contents);
  const [quantity, setQuantity] = React.useState(initialValues.quantity);
  const [recommendedRetailPrice, setRecomendedRetailPrice] = React.useState(initialValues.recommendedRetailPrice);
  const [totalPrice, setTotalPrice] = React.useState(initialValues.totalPrice);
  const [unitPrice, setUnitPrice] = React.useState(initialValues.unitPrice);
  const [unitType, setUnitType] = React.useState({ value: initialValues.unitType, label: initialValues.unitType });
  const [selectedStateIds, setSelectedStateIds] = React.useState(
    initialValues.stateIds.map(x => ({
      value: x.id,
      label: `${x.cityTitle} - ${x.title}`,
    })),
  );
  const unitTypeOptions = [{ value: 'AD', label: 'AD' }, { value: 'KG', label: 'KG' }, { value: 'KL', label: 'KL' }];
  const { mutation: createProductSpecify } = useMutation(mutationEndPoints.createSpecifyProductForAuthUser, {
    variables: {
      barcode,
      contents,
      quantity,
      recommendedRetailPrice,
      stateIds: selectedStateIds.map(s => s.value),
      totalPrice,
      unitPrice,
      unitType: unitType.value,
    },
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllSpecifies)],
  });
  const { mutation: updateProductSpecify } = useMutation(mutationEndPoints.updateSpecifyProduct, {
    variables: {
      id: props.data ? props.data.id : '',
      barcode,
      contents,
      quantity,
      recommendedRetailPrice,
      stateList: selectedStateIds.map(s => s.value),
      totalPrice,
      unitPrice,
      unitType: unitType.value,
    },
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllSpecifies)],
  });
  /* CreateProductSpecifyPage Callbacks */
  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    if (props.isCreate) {
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
    } else {
      updateProductSpecify()
        .then(() => {
          alertContext.show('Urun Basariyla Gunellendi', { type: 'success' });
          routerHistory.push('/product-specifies');
        })
        .catch(() => {
          alertContext.show('Lutfen Tum Alanlari Doldurun', { type: 'error' });
        })
        .finally(() => {
          applicationContext.loading.hide();
        });
    }
  }, [
    applicationContext.loading,
    alertContext,
    createProductSpecify,
    updateProductSpecify,
    props.isCreate,
    routerHistory,
  ]);

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
    <StyledCreateProductSpecifyPageWrapper>
      <StyledCreateProductSpecifyHeader>
        <h3>{props.isCreate ? 'Urun Ekle' : 'Urun Duzenle'}</h3>
      </StyledCreateProductSpecifyHeader>
      <StyledCreateProductSpecifyContent>
        <StyledCreateProductSpecifyContentElement>
          <label>Icerik</label>
          <StyledInput id="contents" type="number" value={contents} onChange={e => setContents(parseInt(e, 10))} />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Adet</label>
          <StyledInput id="quantity" type="number" value={quantity} onChange={e => setQuantity(parseInt(e, 10))} />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Tavsiye Ettiginiz Satis Fiyati</label>
          <StyledInput
            id="rcmdprc"
            type="number"
            value={recommendedRetailPrice}
            onChange={e => setRecomendedRetailPrice(parseInt(e, 10))}
          />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Fiyat</label>
          <StyledInput
            id="totalPrice"
            type="number"
            value={totalPrice}
            onChange={e => setTotalPrice(parseInt(e, 10))}
          />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Adet Fiyati</label>
          <StyledInput id="unitPrice" type="number" value={unitPrice} onChange={e => setUnitPrice(parseInt(e, 10))} />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Icerik Turu</label>
          <Select
            options={unitTypeOptions}
            placeholder="Secim Yapin"
            className={selectInput}
            value={unitType}
            onChange={e => setUnitType(e)}
          />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <label>Satis Yapacaginiz Bolgeler</label>
          <Select
            isMulti
            className={selectInput}
            isSearchable
            isClearable
            onChange={e => setSelectedStateIds(e)}
            value={selectedStateIds}
            options={applicationContext.user.activeStates.map(x => ({
              value: x.id,
              label: `${x.cityTitle} - ${x.title}`,
            }))}
            placeholder="Secim Yapin"
          />
        </StyledCreateProductSpecifyContentElement>
        <StyledCreateProductSpecifyContentElement>
          <StyledButton
            disabled={
              selectedStateIds.length === 0 ||
              !unitPrice ||
              !unitType ||
              !totalPrice ||
              !recommendedRetailPrice ||
              !quantity ||
              !contents
            }
            onClick={handleSubmit}
          >
            {props.isCreate ? 'Ekle' : 'Duzenle'}
          </StyledButton>
        </StyledCreateProductSpecifyContentElement>
      </StyledCreateProductSpecifyContent>
    </StyledCreateProductSpecifyPageWrapper>
  );
}
const PureProductSpecifyCreateUpdateComponent = React.memo(ProductSpecifyCreateUpdateComponent);

export { PureProductSpecifyCreateUpdateComponent as ProductSpecifyCreateUpdateComponent };
