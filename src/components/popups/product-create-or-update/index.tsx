import * as React from 'react';
import lodashGet from 'lodash.get';
import styled, { colors, css } from '~/styled';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { UIIcon, UIInput, UIButton, Loading, UICheckbox } from '~/components/ui';
import { CategoryInput } from './category-input';
import { usePopupContext } from '~/contexts/popup/context';
import { useTranslation } from '~/i18n';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { IProductResponse } from '~/services/helpers/backend-models';
import { useApplicationContext } from '~/app/context';
import { useAlert } from '~/utils/hooks';

/*  ProductPopup Helpers */
export interface ProductPopupValues {
  categoryId?: string;
  initialValue?: IProductResponse;
  hasBarcode?: (barcode: string) => void;
  onCreate?: (barcode: string) => void;
}

interface ProductPopupProps {
  params: ProductPopupValues;
  type: 'create' | 'update';
}

/* ProductPopup Style Constants */

/* ProductPopup Styles */
const StyledProductPopupWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 32px 16px 16px 16px;
  border-radius: 4px;
`;
const StyledCheckboxText = styled.span`
  font-size: 14.5px;
`;

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${colors.gray};
`;

export const inputIconStyle = css`
  padding: 4px 12px;
  background-color: ${colors.whiteSolid};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid ${colors.lightGray};
`;

export const StyledInput = styled(UIInput)<{}>`
  margin-bottom: 16px;
  border: 1px solid ${colors.lightGray};
  :focus-within {
    border: 1px solid ${colors.primary};
    .${inputIconStyle} {
      border-right: 1px solid ${colors.primary};
      color: ${colors.primary};
    }
    .${commonInputStyle} {
      color: ${colors.primary};
    }
  }
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

const imageIconStyle = css`
  padding: 8px;
`;
const checkboxStyle = css`
  margin-bottom: 16px;
`;
const filePickerInputId = 'image-picker-create-category-popup';

function ProductPopup(props: React.PropsWithChildren<ProductPopupProps>) {
  const { t } = useTranslation();
  const alert = useAlert();
  const popups = usePopupContext();
  const applicationContext = useApplicationContext();
  const [createLoading, setCreateLoading] = React.useState(false);
  const initialValue = props.params.initialValue || ({ active: false, name: '', tax: 0 } as any);
  const [isBarcodeCorrect, setIsBarcodeCorrect] = React.useState(false);
  const [isBarcodeSaved, setIsBarcodeSaved] = React.useState(false);
  const [barcode, setBarcode] = React.useState(initialValue.barcodeList ? initialValue.barcodeList[0] : '');
  const [imgSrc, setImgSrc] = React.useState(initialValue.photoUrl);
  const [img, setImg] = React.useState<File>(null);
  const [categoryId, setCategoryId] = React.useState(lodashGet(props.params, 'categoryId', ''));
  const [productName, setProductName] = React.useState(initialValue.name || '');
  const [taxNumber, setTaxNumber] = React.useState<number>(initialValue.tax);
  const [isActive, setIsActive] = React.useState<boolean>(initialValue.active);
  const refetchQuery = props.params.categoryId
    ? paginationQueryEndpoints.getAllProductsByCategoryId
    : paginationQueryEndpoints.getAllProducts;
  const { mutation: createProduct } = useMutation(mutationEndPoints.createProduct, {
    refetchQueries: [refetchFactory(refetchQuery, { categoryId: props.params.categoryId })],
    variables: {
      barcode,
      categoryId,
      name: productName,
      uploadfile: img,
      tax: taxNumber,
      status: isActive,
    },
  });
  const { mutation: updateProduct } = useMutation(mutationEndPoints.updateProduct, {
    refetchQueries: [refetchFactory(refetchQuery, { categoryId: props.params.categoryId })],
    variables: {
      id: props.params.initialValue ? props.params.initialValue.id : '',
      barcode,
      categoryId,
      name: productName,
      uploadfile: img,
      tax: taxNumber,
      status: isActive,
    },
  });
  const { mutation: checkProduct, loading: checkProductLoading } = useMutation(mutationEndPoints.hasProduct, {
    variables: { barcode },
  });
  const onSubmit = React.useCallback(() => {
    setCreateLoading(true);
    if (props.type === 'create') {
      createProduct()
        .then(() => {
          if (props.params.onCreate) {
            props.params.onCreate(barcode);
            alert.show('Urun basariyla Eklendi', { type: 'success' });
          }
          popups.createProduct.hide();
        })
        .catch(() => {
          alert.show('Urun Eklenirken Hata Olustu', { type: 'error' });
        });
    } else {
      updateProduct()
        .then(() => {
          alert.show('Urun basariyla Guncellendi', { type: 'success' });

          popups.updateProduct.hide();
        })
        .catch(() => {
          alert.show('Urun Guncellenirken Hata Olustu', { type: 'error' });
        });
    }
  }, [
    props.params,
    createProduct,
    barcode,
    props.type,
    popups.createProduct,
    popups.updateProduct,
    alert,
    updateProduct,
  ]);
  const __ = (
    <StyledProductPopupWrapper>
      <StyledHiddenFilePicker
        hidden
        id={filePickerInputId}
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
      <StyledCategoryImgWrapper htmlFor={filePickerInputId}>
        {imgSrc && <StyledCategoryImg src={imgSrc} />}
        {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
      </StyledCategoryImgWrapper>
      <StyledInput
        inputClassName={commonInputStyle}
        // TODO:move to translation
        placeholder="Urun Ismini Girin"
        value={productName}
        onChange={e => setProductName(e)}
        id="product-name"
        leftIcon={
          <UIIcon
            className={inputIconStyle}
            name="nameTag"
            size={20}
            color={productName ? colors.primary : colors.gray}
          />
        }
      />
      <StyledInput
        inputClassName={commonInputStyle}
        // TODO:move to translation
        placeholder="Urun Tax Number Girin"
        type="number"
        onChange={e => setTaxNumber(parseInt(e, 10))}
        id="tax-number"
        leftIcon={
          <UIIcon className={inputIconStyle} name="tax" size={20} color={productName ? colors.primary : colors.gray} />
        }
      />
      {applicationContext.user.isAdmin && (
        <UICheckbox
          value={isActive}
          id="is-active"
          className={checkboxStyle}
          label={<StyledCheckboxText>Aktif Mi?</StyledCheckboxText>}
          onChange={isChecked => {
            setIsActive(isChecked);
          }}
        />
      )}
      <CategoryInput
        onSelect={category => {
          setCategoryId(category.id);
        }}
        selectedCategoryId={categoryId}
      />
      <StyledButton disabled={!barcode || !productName || !categoryId || taxNumber < 1 || !imgSrc} onClick={onSubmit}>
        {createLoading ? (
          <Loading color={colors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>{props.type === 'create' ? t('common.create') : t('common.update')}</span>
        )}
      </StyledButton>
    </StyledProductPopupWrapper>
  );
  const barcodeInput = (
    <StyledProductPopupWrapper>
      <StyledInput
        inputClassName={commonInputStyle}
        // TODO:move to translation
        placeholder="Barkodu Girin"
        value={barcode}
        onChange={e => setBarcode(e)}
        id="barcode"
        leftIcon={
          <UIIcon
            className={inputIconStyle}
            name={checkProductLoading ? 'loading' : 'qrCode'}
            size={20}
            color={barcode ? colors.primary : colors.gray}
          />
        }
      />
      {/* TODO: move translation */}
      {isBarcodeSaved && <strong style={{ marginBottom: 4 }}>daha once kayit edilmis</strong>}
      <StyledButton
        disabled={!barcode}
        onClick={() =>
          checkProduct().then(({ hasBarcode }) => {
            setIsBarcodeCorrect(!hasBarcode);
            setIsBarcodeSaved(hasBarcode);
            if (hasBarcode && props.params.hasBarcode) {
              props.params.hasBarcode(barcode);
            }
          })
        }
      >
        {checkProductLoading ? (
          <Loading color={colors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>{t('common.next')}</span>
        )}
      </StyledButton>
    </StyledProductPopupWrapper>
  );

  /* ProductPopup Lifecycle  */

  /* ProductPopup Functions  */

  if (!isBarcodeCorrect && props.type === 'create') {
    return barcodeInput;
  }

  return __;
}

const _ProductPopup = ProductPopup;

export { _ProductPopup as ProductPopup };
