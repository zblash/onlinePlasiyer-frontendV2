import * as React from 'react';
import lodashGet from 'lodash.get';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { UIIcon, UIInput, UIButton, Loading } from '~/components/ui';
import { CategoryInput } from './category-input';
import { usePopupContext } from '~/contexts/popup/context';

/*  ProductPopup Helpers */
export interface ProductPopupValues {
  categoryId?: string;
}
interface ProductPopupProps {
  initialState: ProductPopupValues;
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

export const commonInputStyle = css`
  margin: 0 8px;
  color: ${colors.textColor};
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
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 4px;
  :hover {
    color: #fff;
    background-color: ${colors.primary};
    .${loadingStyle}:after {
      border-color: ${colors.white} transparent;
    }
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

const filePickerInputId = 'image-picker-create-category-popup';

function ProductPopup(props: React.PropsWithChildren<ProductPopupProps>) {
  const { t } = useTranslation();
  const popups = usePopupContext();
  const [isBarcodeCorrect, setIsBarcodeCorrect] = React.useState(false);
  const [isBarcodeSaved, setIsBarcodeSaved] = React.useState(false);
  const [barcode, setBarcode] = React.useState('');
  const [imgSrc, setImgSrc] = React.useState('');
  const [img, setImg] = React.useState<File>(null);
  const [categoryId, setCategoryId] = React.useState(lodashGet(props.initialState, 'categoryId', ''));
  const [productName, setProductName] = React.useState('');
  const [taxNumber, setTaxNumber] = React.useState('');
  const { mutation: createProduct } = useMutation(mutationEndPoints.createProduct, {
    // TODO: refetch pagination query
    variables: {
      barcode,
      categoryId,
      name: productName,
      uploadfile: img,
      tax: parseInt(taxNumber, 10),
    },
  });
  const { mutation: checkProduct, loading: checkProductLoading } = useMutation(mutationEndPoints.checkProduct, {
    variables: { barcode },
  });

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
        value={taxNumber}
        onChange={e => setTaxNumber(e)}
        id="tax-number"
        leftIcon={
          <UIIcon className={inputIconStyle} name="tax" size={20} color={productName ? colors.primary : colors.gray} />
        }
      />

      <CategoryInput
        /* TODO: unHidden for update product */
        disabled
        onSelect={category => {
          setCategoryId(category.id);
        }}
        selectedCategoryId={categoryId}
      />
      <StyledButton
        disabled={!barcode || !productName || !categoryId || !img || !taxNumber}
        onClick={() =>
          createProduct().then(() => {
            popups.createProduct.hide();
          })
        }
      >
        {checkProductLoading ? (
          <Loading color={colors.primary} size={22} className={loadingStyle} />
        ) : (
          <span>{t('common.create')}</span>
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
          checkProduct()
            .then(() => {
              setIsBarcodeCorrect(false);
              setIsBarcodeSaved(true);
            })
            .catch(() => {
              setIsBarcodeCorrect(true);
              setIsBarcodeSaved(false);
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

  if (!isBarcodeCorrect) {
    return barcodeInput;
  }

  return __;
}

const _ProductPopup = ProductPopup;

export { _ProductPopup as ProductPopup };
