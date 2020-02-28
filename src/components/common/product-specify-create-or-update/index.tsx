import * as React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIButton, UIInput, UICheckbox, UIIcon } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { useApplicationContext } from '~/app/context';
import { ISpecifyProductResponse } from '~/services/helpers/backend-models';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { refetchFactory } from '~/services/utils';
import { CreateProductComponent } from '../create-product';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

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
const StyledCategoryImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const StyledCategoryImgWrapper = styled.label`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;

const imageIconStyle = css`
  padding: 8px;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
const textCenter = css`
  text-align: center;
`;
/* ProductSpecifyCreateUpdateComponent Component  */
function ProductSpecifyCreateUpdateComponent(props: React.PropsWithChildren<ProductSpecifyCreateUpdateComponentProps>) {
  const initialValues = {
    barcode: props.data ? props.data.productBarcodeList[0] : '',
    contents: props.data ? props.data.contents : 1,
    quantity: props.data ? props.data.quantity : 0,
    recommendedRetailPrice: props.data ? props.data.recommendedRetailPrice : 0,
    totalPrice: props.data ? props.data.totalPrice : 0,
    unitPrice: props.data ? props.data.unitPrice : 0,
    unitType: props.data ? props.data.unitType : null,
    stateIds: props.data ? props.data.states : [],
    discount: props.data ? props.data.discount : false,
    promotionType: props.data && props.data.promotion ? props.data.promotion.promotionType : null,
    discountUnit: props.data && props.data.promotion ? props.data.promotion.discountUnit : 1,
    promotionText: props.data && props.data.promotion ? props.data.promotion.promotionText : '',
    discountValue: props.data && props.data.promotion ? props.data.promotion.discountValue : 0,
  };
  const alertContext = useAlert();
  const routerHistory = useHistory();
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
  const [discount, setDiscount] = React.useState(initialValues.discount);
  const [discountValue, setDiscountValue] = React.useState(initialValues.discountValue);
  const [discountUnit, setDiscountUnit] = React.useState(initialValues.discountUnit);
  const [promotionType, setPromotionType] = React.useState({
    value: initialValues.promotionType,
    label: initialValues.promotionType,
  });
  const promotionTypeOptions = [{ value: 'PERCENT', label: 'PERCENT' }, { value: 'PROMOTION', label: 'PROMOTION' }];
  const [promotionText, setPromotionText] = React.useState(initialValues.promotionText);
  const { data: product, loading: productLoading } = useQuery(queryEndpoints.getProductByBarcode, {
    defaultValue: {},
    variables: { barcode },
    skip: !barcode || props.isCreate,
  });
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
      discount,
      discountValue,
      discountUnit,
      promotionText,
      promotionType: promotionType.value,
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
      discount,
      discountValue,
      discountUnit,
      promotionText,
      promotionType: promotionType.value,
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
  /*     React.useEffect(() => {
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
 */
  React.useEffect(() => {
    if (unitType && unitPrice) {
      let price = unitPrice;
      if ((unitType.value === 'KG' || unitType.value === 'KL') && contents) {
        price = contents * unitPrice;
      }
      setTotalPrice(price);
    }
  }, [contents, unitType, unitPrice]);

  return (
    <>
      {props.isCreate && (
        <StyledCreateProductSpecifyPageWrapper>
          <StyledCreateProductSpecifyHeader>
            <h3>Urun Bilgileri</h3>
          </StyledCreateProductSpecifyHeader>
          <CreateProductComponent hasBarcode={b => setBarcode(b)} onCreate={b => setBarcode(b)} />
        </StyledCreateProductSpecifyPageWrapper>
      )}
      <StyledCreateProductSpecifyPageWrapper>
        <StyledCreateProductSpecifyHeader>
          <h3>{props.isCreate ? 'Urun Ekle' : 'Urun Duzenle'}</h3>
        </StyledCreateProductSpecifyHeader>
        {!props.isCreate && !productLoading && product && barcode && (
          <StyledCreateProductSpecifyContent>
            <StyledCreateProductSpecifyContentElement>
              <h3 className={textCenter}>{product.name} URUNU ICIN</h3>
              <StyledCategoryImgWrapper>
                {product.photoUrl && <StyledCategoryImg src={product.photoUrl} />}
                {!product.photoUrl && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
              </StyledCategoryImgWrapper>
              <p className={textCenter}>
                Barkod Listesi: {product.barcodeList && product.barcodeList.map(br => `${br}, `)}
              </p>
            </StyledCreateProductSpecifyContentElement>
          </StyledCreateProductSpecifyContent>
        )}
        <StyledCreateProductSpecifyContent>
          <StyledCreateProductSpecifyContentElement>
            <label>Icerik Turu</label>
            <Select
              options={unitTypeOptions}
              placeholder="Secim Yapin"
              className={selectInput}
              value={unitType}
              onChange={e => setUnitType(e)}
              isDisabled={!barcode}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Satis Icerigi</label>
            <StyledInput
              id="contents"
              type="number"
              readOnly={!barcode}
              value={contents}
              onChange={e => setContents(parseInt(e, 10))}
            />
          </StyledCreateProductSpecifyContentElement>

          <StyledCreateProductSpecifyContentElement>
            <label>Adet Fiyati</label>
            <StyledInput
              id="unitPrice"
              type="number"
              readOnly={!barcode}
              value={unitPrice}
              onChange={e => setUnitPrice(parseInt(e, 10))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Toplam Satis Fiyati</label>
            <StyledInput
              id="totalPrice"
              type="number"
              readOnly
              value={totalPrice}
              onChange={e => setTotalPrice(parseInt(e, 10))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Stok Miktari</label>
            <StyledInput id="quantity" type="number" value={quantity} onChange={e => setQuantity(parseInt(e, 10))} />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Tavsiye Ettiginiz Satis Fiyati</label>
            <StyledInput
              id="rcmdprc"
              type="number"
              value={recommendedRetailPrice}
              readOnly={!barcode}
              onChange={e => setRecomendedRetailPrice(parseInt(e, 10))}
            />
          </StyledCreateProductSpecifyContentElement>
          <StyledCreateProductSpecifyContentElement>
            <label>Satis Yapacaginiz Bolgeler</label>
            <Select
              isMulti
              className={selectInput}
              isSearchable
              isClearable
              isDisabled={!barcode}
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
            <UICheckbox
              value={discount}
              label="Promosyon/Indirim Uygulanacak mi?"
              id="product-discount"
              onChange={isChecked => {
                setDiscount(isChecked);
              }}
            />
          </StyledCreateProductSpecifyContentElement>
          {discount && (
            <StyledCreateProductSpecifyContentElement>
              <label>Promosyon Basligi</label>
              <StyledInput id="promotionText" type="text" value={promotionText} onChange={e => setPromotionText(e)} />
              <label>Gecerli Olacagi Satin Alma</label>
              <StyledInput
                id="discountUnit"
                type="number"
                value={discountUnit}
                readOnly={!barcode}
                onChange={e => setDiscountUnit(parseInt(e, 10))}
              />
              <label>Promosyon/Indirim Tipi</label>
              <Select
                options={promotionTypeOptions}
                placeholder="Secim Yapin"
                className={selectInput}
                value={promotionType}
                isDisabled={!barcode}
                onChange={e => setPromotionType(e)}
              />
              <label>Promosyon/Indirim Tutari</label>
              <StyledInput
                id="discountValue"
                type="number"
                value={discountValue}
                readOnly={!barcode}
                onChange={e => setDiscountValue(parseInt(e, 10))}
              />
            </StyledCreateProductSpecifyContentElement>
          )}
          <StyledCreateProductSpecifyContentElement>
            <StyledButton
              disabled={
                selectedStateIds.length === 0 ||
                !unitPrice ||
                !unitType ||
                !totalPrice ||
                !recommendedRetailPrice ||
                !quantity ||
                !contents ||
                (discount && (!discountUnit || !discountValue || !promotionText || !promotionType))
              }
              onClick={handleSubmit}
            >
              {props.isCreate ? 'Ekle' : 'Duzenle'}
            </StyledButton>
          </StyledCreateProductSpecifyContentElement>
        </StyledCreateProductSpecifyContent>
      </StyledCreateProductSpecifyPageWrapper>
    </>
  );
}
const PureProductSpecifyCreateUpdateComponent = React.memo(ProductSpecifyCreateUpdateComponent);

export { PureProductSpecifyCreateUpdateComponent as ProductSpecifyCreateUpdateComponent };
