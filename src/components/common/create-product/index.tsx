import * as React from 'react';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton, UIIcon, UICheckbox } from '~/components/ui';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useAlert } from '~/utils/hooks';
import { useApplicationContext } from '~/app/context';
import { IProductResponse } from '~/services/helpers/backend-models';
import useCreateProductState from './useCreateProductState';
/* CreateProductComponent Helpers */
interface CreateProductComponentProps {
  hasBarcode?: (barcode: string) => void;
  onCreate?: (barcode: string) => void;
  isAdminPage?: boolean;
  type?: 'create' | 'update';
  initialValue?: IProductResponse;
}

/* CreateProductComponent Constants */

/* CreateProductComponent Styles */

const StyledContent = styled.div`
  width: 100%;
`;
const StyledContentElement = styled.div`
  width: 100%;
`;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const loadingStyle = css``;
const StyledButton = styled(UIButton)<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  background-color: ${colors.white};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'cursor')};
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: ${props => (props.disabled ? colors.primary : colors.white)};
    background-color: ${props => (props.disabled ? colors.white : colors.primary)};
    ${props =>
      props.disabled
        ? ''
        : `
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
  `}
  }
  :active {
    background-color: ${colors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;
const StyledHiddenFilePicker = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -999;
  pointer-events: none;
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
  width: 48px;
  height: 48px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;
const StyledCheckboxText = styled.span`
  font-size: 14.5px;
`;
const imageIconStyle = css`
  padding: 8px;
`;
const barcodeInput = css`
  width: 70%;
  float: left;
`;
const label = css`
  width: 100%;
  float: left;
`;
const barcodeCheckBtn = css`
  float: right;
`;
const selectInput = css`
  margin-bottom: 10px;
`;
const overFlow = css`
  overflow: auto;
`;
const checkboxStyle = css`
  margin-bottom: 16px;
`;
/* CreateProductComponent Component  */
function CreateProductComponent(props: React.PropsWithChildren<CreateProductComponentProps>) {
  /* CreateProductComponent Variables */
  const initialValue =
    props.initialValue || ({ active: false, name: '', tax: 0, commission: 0, categoryId: '', categoryName: '' } as any);
  const {
    barcode,
    commission,
    img,
    imgSrc,
    isActive,
    isBarcodeCorrect,
    isBarcodeSaved,
    parentCategory,
    productName,
    setBarcode,
    setCommission,
    setImg,
    setImgSrc,
    setIsActive,
    setIsBarcodeCorrect,
    setIsBarcodeSaved,
    setParentCategory,
    setProductName,
    setSubCategory,
    setTax,
    subCategory,
    tax,
  } = useCreateProductState(initialValue);
  const barcodeRef = React.useRef(true);
  const applicationContext = useApplicationContext();
  const alert = useAlert();
  const taxOptions = React.useMemo(
    () => [
      { value: 0, label: '0%' },
      { value: 1, label: '1%' },
      { value: 8, label: '8%' },
      { value: 18, label: '18%' },
    ],
    [],
  );
  const isReadOnly = (!isBarcodeSaved || isBarcodeCorrect) && !props.isAdminPage;
  const { mutation: checkProduct } = useMutation(mutationEndPoints.hasProduct, {
    variables: { barcode },
  });
  const { mutation: createProduct } = useMutation(mutationEndPoints.createProduct, {
    refetchQueries: [
      refetchFactory(paginationQueryEndpoints.getAllProductsByCategoryId, { categoryId: subCategory.value }),
    ],
    variables: {
      barcode,
      categoryId: subCategory.value,
      name: productName,
      uploadedFile: img,
      tax: tax.value,
      commission,
      status: isActive,
    },
  });
  const { mutation: updateProduct } = useMutation(mutationEndPoints.updateProduct, {
    refetchQueries: [
      refetchFactory(paginationQueryEndpoints.getAllProductsByCategoryId, { categoryId: subCategory.value }),
    ],
    variables: {
      id: props.initialValue ? props.initialValue.id : '',
      barcode,
      categoryId: subCategory.value,
      name: productName,
      uploadedFile: img,
      tax: tax.value,
      commission,
      status: isActive,
    },
  });
  const { data: parentCategories, loading: parentCatLoading } = useQuery(queryEndpoints.getCategories, {
    defaultValue: [],
    variables: { type: 'parent' },
    skip: isBarcodeSaved,
  });
  const { data: subCategories, loading: subCatLoading } = useQuery(queryEndpoints.getSubCategoriesByParentId, {
    defaultValue: [],
    variables: { parentId: parentCategory.value },
    skip: !parentCategory.value,
  });
  const { data: product, loading: productLoading } = useQuery(queryEndpoints.getProductByBarcode, {
    defaultValue: {},
    variables: { barcode },
    skip: !isBarcodeSaved || !isBarcodeCorrect,
  });
  /* CreateProductComponent Callbacks */
  const handleBarcodeSearch = React.useCallback(async () => {
    await checkProduct().then(({ hasBarcode }) => {
      setIsBarcodeSaved(true);
      setIsBarcodeCorrect(hasBarcode);
      barcodeRef.current = false;
      if (!hasBarcode && !props.isAdminPage) {
        alert.show('Barkod sistemde bulunamadi. Ekleyebilirsiniz', { type: 'error' });
      }
      if (hasBarcode && props.isAdminPage && props.type !== 'update') {
        props.hasBarcode(barcode);
      }
    });
  }, [alert, checkProduct, barcodeRef, props, barcode, setIsBarcodeCorrect, setIsBarcodeSaved]);

  const handleSubmit = React.useCallback(() => {
    if (props.type && props.type === 'update') {
      updateProduct()
        .then(() => {
          props.onCreate(barcode);
          alert.show('Urun tanimlamasi basariyla duzenlendi', { type: 'success' });
        })
        .catch(() => {
          alert.show('Urun Duzenlenirken Hata Olustu', { type: 'error' });
        });
    } else if (!isBarcodeCorrect) {
      createProduct()
        .then(() => {
          if (props.onCreate) {
            props.onCreate(barcode);
            alert.show('Urun tanimlamasi basariyla eklendi', { type: 'success' });
          }
        })
        .catch(() => {
          alert.show('Urun Eklenirken Hata Olustu', { type: 'error' });
        });
    } else {
      props.hasBarcode(barcode);
      alert.show('Urun sistemden bulundu, devam edebilirsiniz', { type: 'success' });
    }
  }, [alert, barcode, createProduct, isBarcodeCorrect, props, updateProduct]);
  /* CreateProductComponent Lifecycle  */

  React.useEffect(() => {
    if (!productLoading && barcode && !props.isAdminPage) {
      setProductName(product.name);
      setTax({ value: product.tax, label: `${product.tax}%` });
      setSubCategory({ value: product.categoryId, label: product.categoryName });
      setImgSrc(product.photoUrl);
    }
  }, [productLoading]); // eslint-disable-line

  return (
    <StyledContent>
      {props.type !== 'update' && (
        <StyledContentElement className={overFlow}>
          <label className={label}>Barkod Girin</label>
          <StyledInput className={barcodeInput} id="barcode" value={barcode} onChange={e => setBarcode(e)} />
          <StyledButton
            className={barcodeCheckBtn}
            disabled={!barcode || barcode.length !== 13}
            onClick={handleBarcodeSearch}
          >
            Sorgula
          </StyledButton>
        </StyledContentElement>
      )}
      <StyledContentElement>
        <label>Urun Ismi</label>
        <StyledInput id="product-name" readOnly={isReadOnly} value={productName} onChange={e => setProductName(e)} />
      </StyledContentElement>
      <StyledContentElement>
        <label>Vergi Orani:</label>
        <Select
          options={taxOptions}
          placeholder="Secim Yapin"
          className={selectInput}
          value={tax}
          onChange={e => setTax(e)}
          isDisabled={isReadOnly}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Ana Kategori</label>
        <Select
          options={parentCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={parentCategory}
          onChange={e => setParentCategory(e)}
          isDisabled={isReadOnly || parentCatLoading}
        />
      </StyledContentElement>
      <StyledContentElement>
        <label>Alt Kategori</label>
        <Select
          options={subCategories.map(category => {
            return { value: category.id, label: category.name };
          })}
          placeholder="Secim Yapin"
          className={selectInput}
          value={subCategory}
          onChange={e => setSubCategory(e)}
          isDisabled={isReadOnly || subCatLoading || !parentCategory.value}
        />
      </StyledContentElement>
      {applicationContext.user.isAdmin && (
        <StyledContentElement>
          <label>Urun Komisyonu</label>
          <StyledInput
            id="commission"
            type="number"
            step="0.1"
            value={commission}
            onChange={e => {
              if (parseFloat(e) < 100) {
                setCommission(parseFloat(e));
              }
            }}
          />
        </StyledContentElement>
      )}
      <StyledContentElement>
        <label>Urun Resmi</label>
        <StyledHiddenFilePicker
          hidden
          disabled={isReadOnly}
          id="product-image"
          type="file"
          onChange={event => {
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onload = e => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                setImgSrc(e.target.result as string);
                setImg(file);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
        <StyledCategoryImgWrapper htmlFor="product-image">
          {imgSrc && <StyledCategoryImg src={imgSrc} />}
          {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
        </StyledCategoryImgWrapper>
      </StyledContentElement>
      {applicationContext.user.isAdmin && (
        <StyledContentElement>
          <UICheckbox
            value={isActive}
            id="is-active"
            className={checkboxStyle}
            label={<StyledCheckboxText>Aktif Mi?</StyledCheckboxText>}
            onChange={isChecked => {
              setIsActive(isChecked);
            }}
          />
        </StyledContentElement>
      )}
      <StyledContentElement>
        <StyledButton disabled={!productName || !barcode || !tax || !subCategory} onClick={handleSubmit}>
          Devam Et
        </StyledButton>
      </StyledContentElement>
    </StyledContent>
  );
}
const PureCreateProductComponent = React.memo(CreateProductComponent);

export { PureCreateProductComponent as CreateProductComponent };
